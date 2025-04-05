const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send budget alert email to user
 * @param {string} userEmail - User's email address
 * @param {number} budgetAmount - User's budget amount
 * @param {number} currentSpending - Current spending amount
 * @param {number} percentUsed - Percentage of budget used
 */
const sendBudgetAlert = async (userEmail, budgetAmount, currentSpending, percentUsed) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Budget Alert - You\'ve reached 90% of your budget',
      html: `
        <h2>Budget Alert</h2>
        <p>You've used ${percentUsed.toFixed(2)}% of your budget.</p>
        <p>Budget: $${budgetAmount.toFixed(2)}</p>
        <p>Current spending: $${currentSpending.toFixed(2)}</p>
        <p>Consider reviewing your expenses to stay within your budget.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Budget alert email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending budget alert email:', error);
    return false;
  }
};

module.exports = { sendBudgetAlert };