const {engine} = require('express-handlebars');
const express = require('express')
const connection = require("./db");

const app = express();


app.engine('handlebars', engine());

// if you want to disable the default layout, you can set defaultLayout to false
// check the line below. comment the previous app.engine line and uncomment
// the one below to see the effect
//app.engine('handlebars', engine({defaultLayout:false}));

app.set('view engine', 'handlebars');

app.set('views', './views');


app.get('/', (req, res) => {
  res.render('index', {title: 'Home Page', message: 'Welcome to the Home Page!'});
});

app.get('/about', (req, res) => {

  const info = {
    title: 'About Page', message: 'Welcome to the About Page!',

    'address': {
      'street': '123 Main St',
      'city': 'Anytown',
      'state': 'CA',
      'zip': '12345'
    },
    name: 'John Doe',
    age: 30,
    hobbies: ['reading', 'traveling', 'coding']

  };

  res.render('about', info);
});


app.get('/database', async (req, res) => {

  try{


     const data = await connection.query('SELECT * FROM users');
     console.log('Data fetched from database:', data);

     res.render('database', {title: 'Database Page', users: data[0]});



  }
  catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).send('Internal Server Error');
  }

});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
