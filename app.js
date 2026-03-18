require('dotenv').config({ quiet: true });

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

const indexRouter = require('./routes/index');
const apartmentsRouter = require('./routes/apartments');
const apiRouter = require('./routes/api');

const graphqlSchema = require('./graphql/typeDefs');
const graphqlResolvers = require('./graphql/resolvers');

const apartmentService = require('./services/apartmentService');
const seedData = require('./seed/seedData');

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
      console.log('MongoDB підключено');

      const seeded = await apartmentService.seedDatabase(seedData);

      if (seeded) {
        console.log('БД автоматично заповнена стартовими даними');
      } else {
        console.log('БД вже містить записи, seed не виконано');
      }
    })
    .catch((err) => {
      console.error('Помилка підключення до MongoDB:', err.message);
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/apartments', apartmentsRouter);
app.use('/api', apiRouter);

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

app.use((req, res, next) => {
    res.status(404).render('error', {
        title: 'Сторінку не знайдено',
        message: 'Сторінку не знайдено',
        error: { status: 404 }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('error', {
        title: 'Сталася помилка',
        message: 'Вибачте, щось пішло не так',
        error: { status: err.status || 500 }
    });
});

module.exports = app;