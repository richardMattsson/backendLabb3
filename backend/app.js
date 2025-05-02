const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static('public'));

// fattas const userTaskRoutes nedan

const categoryRoute = require('./routes/categoryRoute');
const taskRoutes = require('./routes/taskRoute');
const userRoutes = require('./routes/userRoute');

// fattas app.use(userTaskRoutes) nedan

app.use(categoryRoute);
app.use(taskRoutes);
app.use(userRoutes);

app.listen(port, () => console.log(`Labb 3 app listening on port ${port}.`));
