const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/usercontroller');

router.post('/register',UserController)
router.get('/list',UserController.list);
router.post('/create',UserController.create);
router.get('/get/:id', UserController.get);
router.post('/update/:id',UserController.update);
router.post('/delete',UserController.delete);
/*router.get('/datatest', EmployeeController.testdata);
router.get('/test',EmployeeController.test);
router.get('/save',(req, res) => {
    res.json({status: "Hello World"});
});
 */

module.exports = router;
