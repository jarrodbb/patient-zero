const router = require('express').Router();

const apiRoutes = require('./api');

// Couldn't find homeRoutes
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
