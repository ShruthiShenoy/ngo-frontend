import { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Alert,
  Box,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const paymentMethodOptions = ['Bank Transfer', 'Credit Card', 'Cash', 'Other'];
const paymentStatusOptions = ['Pending', 'Paid', 'Partially Paid', 'Overdue'];

export const AddInvoicePage = () => {
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorNumber, setVendorNumber] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userEmail } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Basic validation
    if (
      !vendorName ||
      !vendorEmail ||
      !vendorNumber ||
      !invoiceId ||
      !invoiceDate ||
      !dueDate ||
      !amount ||
      !paymentMethod ||
      !paymentStatus
    ) {
      setError('Failed to Create Invoice. Please check your details.');
      return;
    }

    const newInvoice = {
      id: Date.now(), // Simple unique ID for mock purposes
      vendor: vendorName,
      vendorEmail,
      vendorNumber,
      invoiceId,
      invoiceDate,
      dueDate,
      amount: parseFloat(amount),
      paymentMethod,
      paymentStatus,
      createdBy: userEmail || 'Unknown',
      createdAt: new Date().toISOString(),
    };

    try {
      const existingInvoices = JSON.parse(localStorage.getItem('mockInvoices') || '[]');
      localStorage.setItem('mockInvoices', JSON.stringify([...existingInvoices, newInvoice]));
      setSuccess(true);
      setVendorName('');
      setVendorEmail('');
      setVendorNumber('');
      setInvoiceId('');
      setInvoiceDate('');
      setDueDate('');
      setAmount('');
      setPaymentMethod('Bank Transfer');
      setPaymentStatus('Pending');

      setTimeout(() => {
        navigate('/invoices');
      }, 1200);
    } catch (err) {
      setError('Failed to save invoice. Please try again.');
    }
  };

  return (
    <DashboardLayout title="Payable Invoice">
      <Paper sx={{ maxWidth: 480, mx: 'auto', p: 4, background: 'var(--color-soft)', borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)', textAlign: 'center' }}>
          Payable Invoice
        </Typography>
        {success && <Alert severity="success" sx={{ mb: 2, fontFamily: 'var(--font-body)' }}>Invoice Created Successfully</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2, fontFamily: 'var(--font-body)' }}>{error}</Alert>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Vendor name"
            value={vendorName}
            onChange={e => setVendorName(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            inputProps={{ style: { fontFamily: 'var(--font-body)' } }}
            InputLabelProps={{ style: { fontFamily: 'var(--font-body)' } }}
          />
          <TextField
            label="Vendor email"
            type="email"
            value={vendorEmail}
            onChange={e => setVendorEmail(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            inputProps={{ style: { fontFamily: 'var(--font-body)' } }}
            InputLabelProps={{ style: { fontFamily: 'var(--font-body)' } }}
          />
          <TextField
            label="Vendor's number"
            value={vendorNumber}
            onChange={e => setVendorNumber(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            inputProps={{ style: { fontFamily: 'var(--font-body)' } }}
            InputLabelProps={{ style: { fontFamily: 'var(--font-body)' } }}
          />
          <TextField
            label="Invoice id"
            value={invoiceId}
            onChange={e => setInvoiceId(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            inputProps={{ style: { fontFamily: 'var(--font-body)' } }}
            InputLabelProps={{ style: { fontFamily: 'var(--font-body)' } }}
          />
          <TextField
            label="Invoice Date"
            type="date"
            value={invoiceDate}
            onChange={e => setInvoiceDate(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true, style: { fontFamily: 'var(--font-body)' } }}
            inputProps={{ style: { fontFamily: 'var(--font-body)' } }}
          />
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true, style: { fontFamily: 'var(--font-body)' } }}
            inputProps={{ style: { fontFamily: 'var(--font-body)' } }}
          />
          <TextField
            label="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            fullWidth
            required
            sx={{ mb: 2 }}
            inputProps={{ style: { fontFamily: 'var(--font-body)' }, inputMode: 'decimal' }}
            InputLabelProps={{ style: { fontFamily: 'var(--font-body)' } }}
          />
          <TextField
            label="Payment Method"
            select
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            inputProps={{ style: { fontFamily: 'var(--font-body)' } }}
            InputLabelProps={{ style: { fontFamily: 'var(--font-body)' } }}
          >
            {paymentMethodOptions.map(option => (
              <MenuItem key={option} value={option} style={{ fontFamily: 'var(--font-body)' }}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Payment Status"
            select
            value={paymentStatus}
            onChange={e => setPaymentStatus(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            inputProps={{ style: { fontFamily: 'var(--font-body)' } }}
            InputLabelProps={{ style: { fontFamily: 'var(--font-body)' } }}
          >
            {paymentStatusOptions.map(option => (
              <MenuItem key={option} value={option} style={{ fontFamily: 'var(--font-body)' }}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Created By"
            value={userEmail || 'N/A'}
            fullWidth
            InputProps={{ readOnly: true, style: { fontFamily: 'var(--font-body)' } }}
            InputLabelProps={{ style: { fontFamily: 'var(--font-body)' } }}
            sx={{ mb: 3 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: 'var(--color-primary)',
                color: 'var(--color-primary-contrast)',
                fontFamily: 'var(--font-body)',
                '&:hover': { background: 'var(--color-secondary)' },
                width: '100%'
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </DashboardLayout>
  );
}; 