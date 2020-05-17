var express = require('express')
var router = express.Router()

var leadController = require('../db/controllers/leadController')

router.get('/', function(req, res, next) {
  leadController.list(req, res)
})

router.post('/', function(req, res, next) {
  leadController.save(req, res)
})

router.get('/:id', function(req, res, next) {
  leadController.get(req, res)
})

router.put('/:id', function(req, res, next) {
  leadController.update(req, res)
})

router.delete('/:id', function(req, res, next) {
  leadController.delete(req, res)
})

module.exports = router
