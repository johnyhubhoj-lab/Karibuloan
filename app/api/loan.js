const express = require('express');
const router = express.Router();

// Loan Calculation API
router.post('/calculate', (req, res) => {
    const { loanAmount, interestRate, term } = req.body;

    // Input validation
    if (!loanAmount || !interestRate || !term) {
        return res.status(400).json({ message: 'All input fields are required.' });
    }

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(term)) {
        return res.status(400).json({ message: 'All input fields must be numbers.' });
    }

    // Calculate fees and payment
    const interest = (loanAmount * (interestRate / 100) * term);
    const totalPayment = loanAmount + interest;
    const monthlyPayment = totalPayment / (term * 12);

    // Response
    res.json({
        loanAmount,
        interestRate,
        term,
        totalPayment,
        monthlyPayment
    });
});

module.exports = router;
