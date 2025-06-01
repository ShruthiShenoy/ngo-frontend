import axios, { InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock credentials for demo
const MOCK_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
};

// Mock JWT token
const MOCK_TOKEN = 'mockJwtToken123';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock login function
export const login = async (username: string, password: string) => {
  // Simulate network delay
  await delay(1000);

  // Check credentials
  if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
    return {
      success: true,
      token: MOCK_TOKEN,
      user: {
        id: 1,
        username: MOCK_CREDENTIALS.username,
        role: 'admin',
      },
    };
  }

  throw new Error('Invalid credentials');
};

// Mock invoices data
const MOCK_INVOICES = [
  { id: 1, vendor: 'Vendor A', amount: 1000.0, status: 'Pending', date: '2024-03-15' },
  { id: 2, vendor: 'Vendor B', amount: 2500.5, status: 'Approved', date: '2024-03-14' },
  { id: 3, vendor: 'Vendor C', amount: 750.25, status: 'Rejected', date: '2024-03-13' },
  { id: 4, vendor: 'Vendor D', amount: 3200.75, status: 'Pending', date: '2024-03-12' },
  { id: 5, vendor: 'Vendor E', amount: 1500.0, status: 'Approved', date: '2024-03-11' },
];

// Mock invoices endpoint
export const getInvoices = async () => {
  // Simulate network delay
  await delay(1500);

  // Randomly simulate an error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch invoices. Please try again later.');
  }

  return {
    success: true,
    data: MOCK_INVOICES,
  };
};

// Create invoice endpoint
export const createInvoice = async (data: { vendor: string; amount: number }) => {
  // Simulate network delay
  await delay(1000);

  // Validate input
  if (!data.vendor || data.vendor.trim().length === 0) {
    throw new Error('Vendor name is required');
  }

  if (!data.amount || data.amount <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  // Randomly simulate an error (20% chance)
  if (Math.random() < 0.2) {
    throw new Error('Failed to create invoice. Please try again.');
  }

  // Simulate successful creation
  const newInvoice = {
    id: MOCK_INVOICES.length + 1,
    vendor: data.vendor,
    amount: data.amount,
    status: 'Pending',
    date: new Date().toISOString().split('T')[0],
  };

  // Add to mock data
  MOCK_INVOICES.unshift(newInvoice);

  return {
    success: true,
    data: newInvoice,
  };
};

// Add auth token to requests with proper typing and safety
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
