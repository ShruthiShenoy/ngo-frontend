import { useState, useEffect } from 'react';
import {
  Box,
  // Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../contexts/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';

interface User {
  fullName: string;
  email: string;
  role: UserRole;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userRole } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    try {
      const storedUsersRaw = localStorage.getItem('users');
      console.log('Stored users raw from localStorage:', storedUsersRaw); // Debugging line

      const storedUsers = JSON.parse(storedUsersRaw || '[]');
      console.log('Parsed stored users:', storedUsers); // Debugging line

      if (storedUsers.length === 0) {
        // Initialize dummy users if localStorage is empty
        const initialUsers = [
          { fullName: 'Super Admin', email: 'superadmin@gmail.com', password: 'password123', role: 'super_admin' as UserRole, status: 'approved' as const, createdAt: new Date().toISOString() },
          { fullName: 'Admin User', email: 'admin@gmail.com', password: 'password123', role: 'admin' as UserRole, status: 'approved' as const, createdAt: new Date().toISOString() },
          { fullName: 'Volunteer User', email: 'volunteer@gmail.com', password: 'password123', role: 'volunteer' as UserRole, status: 'approved' as const, createdAt: new Date().toISOString() },
        ];
        localStorage.setItem('users', JSON.stringify(initialUsers));
        setUsers(initialUsers);
        console.log('Initialized and set users to state:', initialUsers); // Debugging line
      } else {
        setUsers(storedUsers as User[]); // Cast to User[] after parsing
        console.log('Loaded and set users to state:', storedUsers); // Debugging line
      }
    } catch (err) {
      console.error('Error loading users:', err); // Debugging line
      setError('Failed to load users');
    }
  };

  const handleApprove = (user: User) => {
    try {
      const updatedUsers = users.map(u => {
        if (u.email === user.email) {
          return { ...u, status: 'approved' as const };
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    } catch (err) {
      setError('Failed to approve user');
    }
  };

  const handleReject = (user: User) => {
    try {
      const updatedUsers = users.map(u => {
        if (u.email === user.email) {
          return { ...u, status: 'rejected' as const };
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    } catch (err) {
      setError('Failed to reject user');
    }
  };

  const handlePromote = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDelete = (user: User) => {
    try {
      const updatedUsers = users.filter(u => u.email !== user.email);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    if (!selectedUser) return;

    try {
      const updatedUsers = users.map(u => {
        if (u.email === selectedUser.email) {
          return { ...u, role: newRole };
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setOpenDialog(false);
      setSelectedUser(null);
    } catch (err) {
      setError('Failed to update user role');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'warning';
    }
  };

  const adminUsers = users.filter(user => user.role === 'admin');
  const volunteerUsers = users.filter(user => user.role === 'volunteer');

  return (
    <DashboardLayout title="User Management">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-primary)',
            fontWeight: 700,
          }}
        >
          User Management
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-main)',
          }}
        >
          Manage all users in the system, including their roles and statuses.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2, fontFamily: 'var(--font-body)' }}>
          {error}
        </Alert>
      )}

      {/* Admins Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: 'var(--font-subtitle)',
            color: 'var(--color-secondary)',
            fontWeight: 600,
            mt: 4
          }}
        >
          Admins
        </Typography>
        <TableContainer component={Paper} sx={{ background: 'var(--color-soft)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Name</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Email</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Role</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Status</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Created At</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminUsers.map((user) => (
                <TableRow key={user.email} sx={{ '&:hover': { background: 'var(--color-highlight)' } }}>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{user.fullName}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{user.email}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status)}
                      size="small"
                      sx={{ fontFamily: 'var(--font-body)' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {user.status === 'pending' && (
                      <>
                        <Button
                          size="small"
                          sx={{ background: 'var(--color-primary)', color: 'var(--color-primary-contrast)', '&:hover': { background: 'var(--color-secondary)' }, fontFamily: 'var(--font-body)', mr: 1 }}
                          onClick={() => handleApprove(user)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          sx={{ background: 'var(--color-accent)', color: 'var(--color-primary-contrast)', '&:hover': { background: 'var(--color-secondary)' }, fontFamily: 'var(--font-body)' }}
                          onClick={() => handleReject(user)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {user.status === 'approved' && user.role !== 'super_admin' && (
                      <Button
                        size="small"
                        sx={{ background: 'var(--color-primary)', color: 'var(--color-primary-contrast)', '&:hover': { background: 'var(--color-secondary)' }, fontFamily: 'var(--font-body)', mr: 1 }}
                        onClick={() => handlePromote(user)}
                      >
                        Promote
                      </Button>
                    )}
                    {user.role !== 'super_admin' && (
                      <IconButton
                        size="small"
                        sx={{ color: 'var(--color-accent)', '&:hover': { color: 'var(--color-secondary)' } }}
                        onClick={() => handleDelete(user)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {adminUsers.length === 0 && (
            <Typography variant="body2" sx={{ p: 2, fontFamily: 'var(--font-body)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              No admin users found.
            </Typography>
          )}
        </TableContainer>
      </Box>

      {/* Volunteers Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: 'var(--font-subtitle)',
            color: 'var(--color-secondary)',
            fontWeight: 600,
            mt: 4
          }}
        >
          Volunteers
        </Typography>
        <TableContainer component={Paper} sx={{ background: 'var(--color-soft)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Name</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Email</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Role</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Status</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Created At</TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {volunteerUsers.map((user) => (
                <TableRow key={user.email} sx={{ '&:hover': { background: 'var(--color-highlight)' } }}>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{user.fullName}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{user.email}</TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status)}
                      size="small"
                      sx={{ fontFamily: 'var(--font-body)' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'var(--font-body)' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {user.status === 'pending' && (
                      <>
                        <Button
                          size="small"
                          sx={{ background: 'var(--color-primary)', color: 'var(--color-primary-contrast)', '&:hover': { background: 'var(--color-secondary)' }, fontFamily: 'var(--font-body)', mr: 1 }}
                          onClick={() => handleApprove(user)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          sx={{ background: 'var(--color-accent)', color: 'var(--color-primary-contrast)', '&:hover': { background: 'var(--color-secondary)' }, fontFamily: 'var(--font-body)' }}
                          onClick={() => handleReject(user)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {user.status === 'approved' && user.role !== 'super_admin' && (
                      <Button
                        size="small"
                        sx={{ background: 'var(--color-primary)', color: 'var(--color-primary-contrast)', '&:hover': { background: 'var(--color-secondary)' }, fontFamily: 'var(--font-body)', mr: 1 }}
                        onClick={() => handlePromote(user)}
                      >
                        Promote
                      </Button>
                    )}
                    {user.role !== 'super_admin' && (
                      <IconButton
                        size="small"
                        sx={{ color: 'var(--color-accent)', '&:hover': { color: 'var(--color-secondary)' } }}
                        onClick={() => handleDelete(user)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {volunteerUsers.length === 0 && (
            <Typography variant="body2" sx={{ p: 2, fontFamily: 'var(--font-body)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              No volunteer users found.
            </Typography>
          )}
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>Change User Role</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-main)' }}>
            Current role: {selectedUser?.role}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleRoleChange('admin')}
            sx={{ background: 'var(--color-primary)', color: 'var(--color-primary-contrast)', '&:hover': { background: 'var(--color-secondary)' }, fontFamily: 'var(--font-body)' }}
          >
            Promote to Admin
          </Button>
          <Button
            onClick={() => handleRoleChange('volunteer')}
            sx={{ background: 'var(--color-accent)', color: 'var(--color-primary-contrast)', '&:hover': { background: 'var(--color-secondary)' }, fontFamily: 'var(--font-body)' }}
          >
            Demote to Volunteer
          </Button>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ background: 'var(--color-soft)', color: 'var(--color-text-main)', '&:hover': { background: 'var(--color-muted)' }, fontFamily: 'var(--font-body)' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}; 