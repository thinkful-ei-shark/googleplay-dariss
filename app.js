const express = require('express');
const morgan = require('morgan');
const { query, json } = require('express');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const appData = require('./playstore.js');

app.get('/apps', (req, res) => {

  const {sort , genres} = req.query;

  let results = appData.filter(app =>
    appData
      .sort
      .toLowerCase()
      .includes(sort.toLowerCase())); 


  //if statements

  res
    .json(appData);

});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});