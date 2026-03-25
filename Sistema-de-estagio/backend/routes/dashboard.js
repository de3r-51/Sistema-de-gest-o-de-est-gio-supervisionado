const router = require('express').Router();
const { getStats } = require('../controllers/dashboardController');
const auth = require('../middlewares/authMiddleware');

router.get('/stats', auth, getStats);

module.exports = router;
