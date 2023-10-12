const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const database = require('./config/database');
const errorMiddleWare = require('./middlewares/error');

const app = express();

// ENV
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

//Production
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname + '../../../client/build/index.html'));
  });
}

// DB setup
database();

// Routes
const PostRouter = require('./api/posts/posts.routes');
const StoryRouter = require('./api/stories/stories.routes');
const userRouter = require('./api/users/users.routes');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.get('/api/v1/config', (req, res) => {
  return res.send({
    secure_base_url: `${req.protocol}://${req.get('host')}/api/v1`,
  });
});

//Custom middlewares
app.use('/api/v1/posts', PostRouter);
app.use('/api/v1/stories', StoryRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/uploads', express.static('uploads'));

app.use(errorMiddleWare.notFound);
app.use(errorMiddleWare.errorHandler);

//PORT
const PORT = process.env.PORT || 7777;

app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));
