const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static('public'));

<<<<<<< HEAD
const testRoutes = require('./routes/TestRoute');
const taskRoutes = require('./routes/taskRoute');
app.use(testRoutes);
app.use(taskRoutes);
=======
const categoryRoute = require('./routes/categoryRoute');
app.use(categoryRoute);
>>>>>>> b4a10373ef8d4651c3bc302fec08552a30d4b9ff

app.listen(port, () => console.log(`Labb 3 app listening on port ${port}.`));
