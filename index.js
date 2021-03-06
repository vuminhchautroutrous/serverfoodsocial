const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const AuthRoute = require('./Routers/AuthRouter')
app.use('/auth', AuthRoute);

const PostRouter = require('./Routers/PostRouter')
app.use('/post', PostRouter);

const ImageRouter = require('./Routers/ImageRouter')
app.use('/image', ImageRouter);

const CommentRouter = require('./Routers/CommentRouter')
app.use('/comment', CommentRouter);

const ContentRouter = require('./Routers/ContentRouter')
app.use('/content', ContentRouter);

const VoteRouter = require('./Routers/VoteRouter')
app.use('/vote', VoteRouter);

const ProfileRouter = require('./Routers/ProfileRouter')
app.use('/profile', ProfileRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})