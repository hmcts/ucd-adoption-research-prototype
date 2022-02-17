const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


require('./views/version-1/routes.js')(router);
require('./views/research-2/routes.js')(router);
require('./views/research-jan2022-proposed-changes/routes.js')(router);
require('./views/research-3/routes.js')(router);
require('./views/research-4/routes.js')(router);
