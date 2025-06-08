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
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';

interface Invoice {
  id: number;
  vendor: string;
  vendorEmail: string;
  vendorNumber: string;
  invoiceId: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  createdBy: string;
  createdAt: string;
  status: string;
}

const mockInvoices: Invoice[] = [
  { id: 1, vendor: 'Vendor A', vendorEmail: 'vendorA@example.com', vendorNumber: '123-456-7890', invoiceId: 'INV001', invoiceDate: '2024-03-15', dueDate: '2024-04-15', amount: 1000, paymentMethod: 'Bank Transfer', paymentStatus: 'Pending', createdBy: 'volunteer@gmail.com', createdAt: '2024-03-15T10:00:00Z', status: 'Pending' },
  { id: 2, vendor: 'Vendor B', vendorEmail: 'vendorB@example.com', vendorNumber: '098-765-4321', invoiceId: 'INV002', invoiceDate: '2024-03-14', dueDate: '2024-04-14', amount: 2500, paymentMethod: 'Credit Card', paymentStatus: 'Paid', createdBy: 'admin@gmail.com', createdAt: '2024-03-14T11:30:00Z', status: 'Approved' },
  { id: 3, vendor: 'Vendor C', vendorEmail: 'vendorC@example.com', vendorNumber: '111-222-3333', invoiceId: 'INV003', invoiceDate: '2024-03-13', dueDate: '2024-04-13', amount: 750, paymentMethod: 'Cash', paymentStatus: 'Pending', createdBy: 'superadmin@gmail.com', createdAt: '2024-03-13T09:00:00Z', status: 'Paid' },
];

export const InvoicesPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const navigate = useNavigate();
  const { userRole, hasPermission } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load invoices from localStorage if available, otherwise use mock data
        const storedInvoices = JSON.parse(localStorage.getItem('mockInvoices') || '[]');
        if (storedInvoices.length > 0) {
          setInvoices(storedInvoices);
        } else {
          setInvoices(mockInvoices);
          localStorage.setItem('mockInvoices', JSON.stringify(mockInvoices)); // Save initial mock data
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = (invoiceId: number, newStatus: string) => {
    setInvoices(prevInvoices =>
      prevInvoices.map(invoice =>
        invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
      )
    );
    // Optionally, persist this change to localStorage
    const updatedInvoices = invoices.map(invoice =>
      invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
    );
    localStorage.setItem('mockInvoices', JSON.stringify(updatedInvoices));
  };

  const isAdminOrSuperAdmin = userRole === 'admin' || userRole === 'super_admin';
  const canCreateInvoices = hasPermission('create_invoices');
  const canDeleteInvoices = hasPermission('delete_invoices');

  const handleDeleteInvoice = (invoiceId: number) => {
    const updatedInvoices = invoices.filter(invoice => invoice.id !== invoiceId);
    setInvoices(updatedInvoices);
    localStorage.setItem('mockInvoices', JSON.stringify(updatedInvoices)); // Persist delete
  };

  return (
    <DashboardLayout title="Invoices">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)', margin: 0 }}>Invoices</h1>
        {canCreateInvoices && (
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
            Add Invoice
          </Button>
        )}
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
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Invoice ID</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Vendor Name</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Vendor Email</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Vendor No.</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Amount</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Invoice Date</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Due Date</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Payment Method</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Payment Status</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Created By</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Created At</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Status</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} sx={{ '&:hover': { background: 'var(--color-highlight)' } }}>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.id}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.invoiceId}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.vendor}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.vendorEmail}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.vendorNumber}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>${invoice.amount}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.invoiceDate}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.dueDate}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.paymentMethod}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.paymentStatus}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{invoice.createdBy}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>
                    {isAdminOrSuperAdmin ? (
                      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={invoice.status}
                          onChange={(e) => handleStatusChange(invoice.id, e.target.value as string)}
                          label="Status"
                          sx={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-main)' }}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Approved">Approved</MenuItem>
                          <MenuItem value="Paid">Paid</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <Typography sx={{ fontFamily: 'var(--font-body)' }}>{invoice.status}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {canDeleteInvoices && (
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteInvoice(invoice.id)}
                        sx={{ color: 'var(--color-accent)', '&:hover': { color: 'var(--color-secondary)' } }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DashboardLayout>
  );
}; 