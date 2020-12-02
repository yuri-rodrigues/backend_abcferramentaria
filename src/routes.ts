import { Router } from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import SuppliersController from './controllers/SupplierController';
import AgencieController from './controllers/AgencieController';
import BankController from './controllers/BankController';
import BankAccountController from './controllers/BannkAccountController';
import SupplierContactController from './controllers/SupplierContactController';
import DebtsController from './controllers/DebtsController';
import AccountGroupController from './controllers/AccountGroupController';

const router = Router();

const userController = new UserController();
const suppliersController = new SuppliersController();
const sessionController = new SessionController();
const agencieController = new AgencieController();
const bankController = new BankController();
const bankAccountController = new BankAccountController();
const supplierCcontacController = new SupplierContactController();
const debtsController = new DebtsController();
const accountGroupController = new AccountGroupController();
// ENDPOINTS

router.post('/sessions', sessionController.create);

router.post('/users', userController.create);
router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.remove);

router.post('/suppliers', suppliersController.create);
router.get('/suppliers', suppliersController.index);
router.get('/suppliers/:id', suppliersController.show);
router.put('/suppliers/:id', suppliersController.update);
router.delete('/suppliers/:id', suppliersController.remove);

router.post('/agencies', agencieController.create);
router.get('/agencies', agencieController.index);
router.get('/agencies/:id', agencieController.show);
router.put('/agencies/:id', agencieController.update);
router.delete('/agencies/:id', agencieController.remove);

router.post('/banks', bankController.create);
router.get('/banks', bankController.index);
router.get('/banks/:id', bankController.show);
router.put('/banks/:id', bankController.update);
router.delete('/banks/:id', bankController.remove);

router.post('/bank-accounts', bankAccountController.create);
router.get('/bank-accounts', bankAccountController.index);
router.get('/bank-accounts/:id', bankAccountController.show);
router.put('/bank-accounts/:id', bankAccountController.update);
router.delete('/bank-accounts/:id', bankAccountController.remove);

router.post('/suppliers-contact', supplierCcontacController.create);
router.get('/suppliers-contact', supplierCcontacController.index);
router.get('/suppliers-contact/:id', supplierCcontacController.show);
router.put('/suppliers-contact/:id', supplierCcontacController.update);
router.delete('/suppliers-contact/:id', supplierCcontacController.remove);

router.post('/account-groups', accountGroupController.create);
router.get('/account-groups', accountGroupController.index);
router.get('/account-groups/:id', accountGroupController.show);
router.put('/account-groups/:id', accountGroupController.update);
router.delete('/account-groups/:id', accountGroupController.remove);

router.post('/debts', debtsController.create);
router.get('/debts', debtsController.index);
router.get('/debts/today', debtsController.today);
router.get('/debts/:id', debtsController.show);
router.put('/debts/:id', debtsController.update);
router.patch('/debts/:id', debtsController.baixa);
router.delete('/debts/:id', debtsController.remove);

export default router;
