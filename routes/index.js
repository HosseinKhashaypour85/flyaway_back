const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/userController');
const ipChecker = require('../controllers/ipCheckerController');
const { BuyTicketController, findTicketByEmail, cancellTicket } = require('../controllers/ticketController');
const { addAmountToWallet , decreaseOfAmount } = require('../controllers/walletController');
const {getAllComments , createComment} = require('../controllers/commentsController');


router.get('/users', getAllUsers)
router.post('/users/create', createUser);
router.get('/user/checkIp', ipChecker);
router.post('/tickets/buyTicket', BuyTicketController);
router.get('/tickets', findTicketByEmail);
router.post('/tickets/cancell_ticket', cancellTicket);
router.post('/users/wallet/add_amount', addAmountToWallet);
router.post('/users/wallet/decrease_amount' , decreaseOfAmount);
router.get('/comments' , getAllComments);
router.post('/comments/add' , createComment);

module.exports = router;