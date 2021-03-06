const sql = require("./ConnectMySQL");
const { GetUUID } = require('./AuthModel');

module.exports.GetByID = async (getRequest, result) => {
    sql.query(
        `SELECT tb_vote.voteID, tb_vote.voteValue, tb_vote.voteCreatedAt, tb_vote.postID, tb_vote.userID 
        FROM tb_vote
        WHERE tb_vote.voteID = ?`,
        [getRequest.voteID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        }
    );
};
module.exports.GetByPost = async (getRequest, result) => {
    sql.query(
        `SELECT tb_vote.voteID, tb_vote.voteValue, tb_vote.voteCreatedAt, tb_vote.postID, tb_vote.userID 
        FROM tb_vote
        WHERE tb_vote.postID = ?
        ORDER BY tb_vote.voteCreatedAt DESC`,
        [getRequest.postID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        }
    );
};
module.exports.GetVoteByPostPromise = async (getRequest, result) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT tb_vote.voteID, tb_vote.voteValue, tb_vote.voteCreatedAt, tb_vote.postID, tb_vote.userID, tb_profile.userFirstname, tb_profile.userLastname 
            FROM tb_vote, tb_profile
            WHERE tb_vote.userID = tb_profile.userID AND tb_vote.postID = ?
            ORDER BY tb_vote.voteCreatedAt DESC`,
            [getRequest.postID],
            (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            }
        );
    })
};
module.exports.GetVoteByPostAndUserPromise = async (getRequest) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT tb_vote.voteID, tb_vote.voteValue, tb_vote.voteCreatedAt, tb_vote.postID, tb_vote.userID 
            FROM tb_vote
            WHERE tb_vote.postID = ? AND tb_vote.userID = ?
            ORDER BY tb_vote.voteCreatedAt DESC`,
            [getRequest.postID, getRequest.userID],
            (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            }
        );
    })
};

module.exports.Create = async (getRequest, result) => {
    const uuid = await GetUUID();
    if (!getRequest.voteCreatedAt) {
        getRequest.voteCreatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    sql.query(
        `INSERT INTO tb_vote (tb_vote.voteID, tb_vote.voteValue, tb_vote.voteCreatedAt, tb_vote.postID, tb_vote.userID ) VALUES (?, ?, ?, ?, ?)`,
        [uuid, getRequest.voteValue, getRequest.voteCreatedAt, getRequest.postID, getRequest.userID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, { voteID: uuid, ...data });
            }
        }
    );
};
module.exports.UpdateByID = async (getRequest, result) => {
    sql.query(
        `UPDATE tb_vote 
        SET tb_vote.voteValue = ?
        WHERE tb_vote.voteID = ?`,
        [getRequest.voteValue, getRequest.voteID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, { ...data });
            }
        }
    );
};
module.exports.DeleteByID = async (getRequest, result) => {
    sql.query(
        `DELETE FROM tb_vote WHERE tb_vote.voteID = ?`,
        [getRequest.voteID],
        (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, { ...data });
            }
        }
    );
};