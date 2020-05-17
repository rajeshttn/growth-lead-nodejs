var express = require('express')
var router = express.Router()

var leadsApi = require('./leads')
var leadController = require('../db/controllers/leadController')

router.use('/leads', leadsApi)

router.put('/mark_lead/:id', (req, res) => {
  leadController.markLead(req, res)
})

module.exports = router;
