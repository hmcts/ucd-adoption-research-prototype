const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


require('./views/version-1/routes.js')(router);
