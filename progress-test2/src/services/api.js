// api.js – chứa các hàm gọi API tới JSON Server
import axios from 'axios';

// Lấy hostname hiện tại để tránh lỗi khi frontend không chạy bằng localhost
const host = window.location.hostname || 'localhost';

const API = axios.create({
  baseURL: `http://${host}:3001`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});

// ================= USERS ==================
export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    console.error('API Error fetching users:', {
      message: error?.message,
      url: error?.config?.url,
      status: error?.response?.status
    });
    throw new Error('Failed to fetch users');
  }
};

// ================= PAYMENTS ==================
export const getPayments = async () => {
  try {
    const response = await API.get('/payments');
    return response.data;
  } catch (error) {
    console.error('API Error fetching payments:', {
      message: error?.message,
      url: (error?.config?.baseURL || '') + (error?.config?.url || ''),
      status: error?.response?.status,
      data: error?.response?.data,
    });
    throw new Error('Failed to fetch payments');
  }
};

export const addPayment = async (payment) => {
  try {
    // json-server tự tạo ID nên không cần Date.now
    const response = await API.post('/payments', payment);
    return response.data;
  } catch (error) {
    console.error('API Error adding payment:', error);
    throw new Error('Failed to add payment');
  }
};

export const updatePayment = async (id, payment) => {
  try {
    const response = await API.put(`/payments/${id}`, payment);
    return response.data;
  } catch (error) {
    console.error('API Error updating payment:', error);
    throw new Error('Failed to update payment');
  }
};

export const deletePayment = async (id) => {
  try {
    await API.delete(`/payments/${id}`);
    return id;
  } catch (error) {
    console.error('API Error deleting payment:', error);
    throw new Error('Failed to delete payment');
  }
};

export const getPaymentById = async (id) => {
  try {
    const response = await API.get(`/payments/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error fetching payment details:', error);
    throw new Error('Failed to fetch payment details');
  }
};

// ================= UTILITIES ==================
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

// ================= SERVICE LAYER ==================
export const PaymentService = {
  fetchAllPayments: async () => {
    try {
      const payments = await getPayments();
      return { success: true, data: payments };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  createPayment: async (paymentData) => {
    try {
      if (!paymentData.semester || !paymentData.courseName || !paymentData.amount || !paymentData.date) {
        return { success: false, error: 'All fields are required' };
      }

      if (isNaN(paymentData.amount) || paymentData.amount <= 0) {
        return { success: false, error: 'Amount must be a positive number' };
      }

      const newPayment = await addPayment(paymentData);
      return { success: true, data: newPayment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  modifyPayment: async (id, paymentData) => {
    try {
      const updatedPayment = await updatePayment(id, paymentData);
      return { success: true, data: updatedPayment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  removePayment: async (id) => {
    try {
      await deletePayment(id);
      return { success: true, data: id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getPaymentDetails: async (id) => {
    try {
      const payment = await getPaymentById(id);
      return { success: true, data: payment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  filterPayments: (payments, filters) => {
    let filtered = [...payments];

    if (filters.search) {
      filtered = filtered.filter(payment =>
        payment.semester.toLowerCase().includes(filters.search.toLowerCase()) ||
        payment.courseName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.semester) {
      filtered = filtered.filter(payment => payment.semester === filters.semester);
    }

    if (filters.courseName) {
      filtered = filtered.filter(payment => payment.courseName === filters.courseName);
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'course_asc': return a.courseName.localeCompare(b.courseName);
        case 'course_desc': return b.courseName.localeCompare(a.courseName);
        case 'date_asc': return new Date(a.date) - new Date(b.date);
        case 'date_desc': return new Date(b.date) - new Date(a.date);
        case 'amount_asc': return a.amount - b.amount;
        case 'amount_desc': return b.amount - a.amount;
        default: return 0;
      }
    });

    return filtered;
  }
};
