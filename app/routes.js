const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


require('./views/version-1/routes.js')(router);
require('./views/research-2/routes.js')(router);
require('./views/research-jan2022-proposed-changes/routes.js')(router);
require('./views/research-3/routes.js')(router);
require('./views/research-4/routes.js')(router);
require('./views/research-feb2022-proposed-changes/routes.js')(router);
require('./views/research-5/routes.js')(router);
require('./views/research-6/routes.js')(router);
require('./views/research-apr2022-proposed-changes/routes.js')(router);
require('./views/research-7/routes.js')(router);
require('./views/research-8/routes.js')(router);
require('./views/research-9/routes.js')(router);
require('./views/research-jun2022-proposed-changes/routes.js')(router);
require('./views/research-10/routes.js')(router);
require('./views/research-11/routes.js')(router);
require('./views/research-12/routes.js')(router);

