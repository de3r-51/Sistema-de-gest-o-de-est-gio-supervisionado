const router = require('express').Router();
const c = require('../controllers/usersController');
const auth = require('../middlewares/authMiddleware');

router.use(auth); // todas as rotas protegidas

router.get('/', c.getAll);
router.get('/:id', c.getById);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
