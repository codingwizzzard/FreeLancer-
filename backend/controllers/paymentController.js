const Payment = require('../models/Payment');
const { Parser } = require('json2csv');
const csv = require('csv-parser');
const fs = require('fs');

// Add a new payment
const addPayment = async (req, res) => {
    const { amount, status } = req.body;

    if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
    }
    try {
        const payment = new Payment({
            amount,
            status: status || 'unpaid', // Default to 'unpaid' if no status is provided
        });

        await payment.save();

        res.status(201).json({
            message: 'Payment added successfully',
            payment,
        });
    } catch (error) {
        console.error('Error while adding payment:', error);
        res.status(500).json({
            message: 'Server error while adding payment',
            error: error.message || error,
        });
    }
};

const getPayments = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default page is 1, limit is 10

    try {
        const totalPayments = await Payment.countDocuments(); // Total number of payments
        const payments = await Payment.find()
            .skip((page - 1) * limit) // Skip previous pages
            .limit(Number(limit)); // Limit the number of results per page

        res.status(200).json({
            total: totalPayments,
            page: Number(page),
            pages: Math.ceil(totalPayments / limit), // Total number of pages
            payments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch payments', error });
    }
};

const markAsPaid = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await Payment.findByIdAndUpdate(id, { status: 'paid' }, { new: true });
        if (!payment) return res.status(404).json({ message: 'Payment not found' });

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update payment', error });
    }
};
const simulatePayment = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await Payment.findById(id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });

        // Simulate gateway logic (e.g., processing delay)
        setTimeout(async () => {
            payment.status = 'paid';
            await payment.save();
            res.status(200).json({ message: 'Payment processed successfully', payment });
        }, 2000);
    } catch (error) {
        res.status(500).json({ message: 'Error processing payment', error });
    }
};

const getEarningsOverview = async (req, res) => {
    // try {
    //     const payments = await Payment.find({ status: 'paid' });
    //     const totalEarnings = payments.reduce((sum, payment) => sum + payment.amount, 0);
    //     const monthlyEarnings = {};
    //     payments.forEach((payment) => {
    //         const month = new Date(payment.createdAt).toLocaleString('default', { month: 'short' });
    //         monthlyEarnings[month] = (monthlyEarnings[month] || 0) + payment.amount;
    //     });

    //     res.status(200).json({
    //         totalEarnings,
    //         monthlyEarnings,
    //     });
    // } catch (error) {
    //     res.status(500).json({ message: 'Failed to fetch earnings overview', error });
    // }
    try {
        const payments = await Payment.find({ status: 'paid' });

        // Get all unique months from payments
        const allMonths = payments
            .map((payment) => new Date(payment.createdAt).toLocaleString('default', { month: 'short' }))
            .filter((value, index, self) => self.indexOf(value) === index); // Get unique months

        // Initialize monthly earnings object with all months set to 0
        const monthlyEarnings = allMonths.reduce((acc, month) => {
            acc[month] = 0;
            return acc;
        }, {});

        // Calculate total earnings and populate monthly earnings
        const totalEarnings = payments.reduce((sum, payment) => {
            const month = new Date(payment.createdAt).toLocaleString('default', { month: 'short' });
            monthlyEarnings[month] += payment.amount;
            return sum + payment.amount;
        }, 0);

        res.status(200).json({
            totalEarnings,
            monthlyEarnings,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch earnings overview', error });
    }
};

const exportPaymentsToCSV = async (req, res) => {
    try {
        const payments = await Payment.find().lean(); // Fetch all payments as plain objects

        // Define CSV fields
        const fields = ['amount', 'status', 'createdAt'];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(payments);

        // Set headers and send CSV file
        res.header('Content-Type', 'text/csv');
        res.attachment('payments.csv');
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({ message: 'Error exporting payments', error });
    }
};

const importPaymentsFromCSV = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'CSV file is required' });

    try {
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                await Payment.insertMany(results);
                res.status(201).json({ message: 'Payments imported successfully' });
            });
    } catch (error) {
        res.status(500).json({ message: 'Error importing payments', error });
    }
};


module.exports = { addPayment, getPayments, markAsPaid, simulatePayment, getEarningsOverview,exportPaymentsToCSV, importPaymentsFromCSV };
