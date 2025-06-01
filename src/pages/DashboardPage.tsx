import { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';

const mockInvoices = [
  { id: 1, vendor: 'Vendor A', amount: 1000, date: '2024-03-15', status: 'Pending' },
  { id: 2, vendor: 'Vendor B', amount: 2500, date: '2024-03-14', status: 'Approved' },
  { id: 3, vendor: 'Vendor C', amount: 750, date: '2024-03-13', status: 'Paid' },
];

export const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invoices, setInvoices] = useState(mockInvoices);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setInvoices(mockInvoices);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)', margin: 0 }}>Recent Invoices</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: 'var(--color-primary)',
            color: 'var(--color-primary-contrast)',
            fontFamily: 'var(--font-body)',
            '&:hover': { background: 'var(--color-secondary)' },
          }}
          onClick={() => navigate('/invoices/new')}
        >
          New Invoice
        </Button>
      </div>
      {error && (
        <Alert severity="error" sx={{ mb: 2, fontFamily: 'var(--font-body)' }}>{error}</Alert>
      )}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
          <CircularProgress sx={{ color: 'var(--color-primary)' }} />
        </div>
      ) : (
        <TableContainer component={Paper} sx={{ background: 'var(--color-soft)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>ID</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Vendor</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Amount</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Date</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} sx={{ '&:hover': { background: 'var(--color-highlight)' } }}>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.id}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.vendor}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>${invoice.amount}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.date}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DashboardLayout>
  );
}; 