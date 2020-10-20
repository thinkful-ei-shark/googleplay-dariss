const express = require('express');
const morgan = require('morgan');
const { query, json } = require('express');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const appData = require('./playstore.js');

app.get('/apps', (req, res) => {

  const {sort , genres} = req.query;
  const listOfGenres = [
    'action',
    'puzzle',
    'strategy',
    'casual',
    'arcade',
    'card'
  ];
  if(sort){
    if(!['rating', 'app'].includes(sort)){
      return res.status(400).send('Must be rating or app');
    }
  }
  if(!listOfGenres.includes(genres)){
    return res.status(400).send('Invalid genre');
  }
  let results = appData.filter((store) =>
    store.Genres.toLowerCase().includes(genres.toLowerCase())
  );
  if(sort){
    results.sort((a, b) => {
      return a(sort) > b(sort) ? 1 : a(sort) < b(sort) ? -1 : 0;
    });
  }
  res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});