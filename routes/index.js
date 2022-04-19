const express = require('express');
const celebritiesRouter = express.Router();

const Celebrity = require('./../models/celebrity');

// Handle GET request for website root

celebritiesRouter.get('/', (req, res, next) => {
  res.render('index');
});

celebritiesRouter.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebritiesRouter.get('/celebrities/:id', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;
  Celebrity.create({ name, occupation, catchphrase })
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      res.render('celebrities/create');
    });
});

celebritiesRouter.post('/celebrities/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = celebritiesRouter;
