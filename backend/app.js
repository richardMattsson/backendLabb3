const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static('public'));

const categoryRoute = require('./routes/categoryRoute');
const taskRoutes = require('./routes/taskRoute');
const userRoutes = require('./routes/userRoute');
const userTaskRoute = require('./routes/userTaskRoute');
const authRoutes = require('./routes/authRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
// const protectedRoutes = require('./routes/protectedRoutes');

app.use(categoryRoute);
app.use(taskRoutes);
app.use(userRoutes);
app.use(userTaskRoute);
app.use('/api/auth', authRoutes);
app.use('/api', ratingRoutes);
app.use('/api', taskRoutes);
// app.use('/api/protected', protectedRoutes);

const connectionMongoDB = require('./connectionMongoDB');
connectionMongoDB();

app.listen(port, () => console.log(`Labb 3 app listening on port ${port}.`));
