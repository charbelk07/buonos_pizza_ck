const router = require('express').Router();

const apiRoutes = require('./api');
const mainRoutes = require('./homeRoutes');
const main1Routs = require('./dashboard');

router.use('/', mainRoutes);
router.use('/api', apiRoutes);
// Adding new routes to basic pages
//router.use('/someThing', something);


router.use('/api', apiRoutes);

module.exports = router;