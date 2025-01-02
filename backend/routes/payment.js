const express = require('express');
const { getPayments, markAsPaid, simulatePayment, addPayment, getEarningsOverview, exportPaymentsToCSV , importPaymentsFromCSV } = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const upload = require("../middleware/multer");
const router = express.Router();

router.post('/', auth, addPayment);
router.get('/', auth, getPayments);
router.put('/:id/paid', auth, markAsPaid);
router.put('/:id/simulate', auth, simulatePayment);
router.get('/earnings-overview', auth, getEarningsOverview);
router.get('/export/csv', auth, exportPaymentsToCSV);
router.post('/import/csv', auth, upload.single('file'), importPaymentsFromCSV);

module.exports = router;
