module.exports = (db) => {
  var express = require('express')
  var router = express.Router()

  // list
  router.get('/', function (req, res) {
    db.find(function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting data.',
          error: err
        })
      }
      return res.json(result)
    })
  }),

  // search
  router.get('/search', function (req, res) {
    db.find(req.query, function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting data.',
          error: err
        })
      }
      return res.json(result)
    })
  }),

  // show
  router.get('/:user', function (req, res) {
    db.findOne({username: req.params.user}, function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting data.',
          error: err
        })
      }
      if (!result) {
        return res.status(404).json({
          message: 'No such data'
        })
      }
      return res.json(result)
    })
  }),

  // create
  router.post('/', function (req, res) {
    db.create(req.body, function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating data',
          error: err
        })
      }
      return res.status(201).json(result)
    })
  }),

  // update
  router.put('/:user', function (req, res) {
    db.findOneAndUpdate({username: req.params.user}, req.body, function (err, result) {
      if (err){
        return res.status(500).json({
          message: 'Error when updating data',
          error: err
        })
      }
      res.json(result);
    })
  }),

  // delete
  router.delete('/:user', function (req, res) {
    db.findOneAndDelete({username: req.params.user}, function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the data.',
          error: err
        })
      }
      return res.status(204).json(result)
    })
  })

  return router
}
