//setting up imports and dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers }); //handlebars engine custom helpers

const sess = { //session
    secret: 'Super secret secret',
    cookie: {
      maxAge: 300000, // 5 minutes
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
app.use(session(sess)); //use session with express

//tell express to use handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//--V added to fix not working button. i have no explanation.
app.get('/public/js/dashboard.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(path.join(__dirname, 'public', 'js', 'delete.js'));
});
//--^ added to fix not working button. i have no explanation.



app.use(routes); //tell express to use routes in controllers folder

//sequelize sync on server start up and listen
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
