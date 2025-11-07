//api.js chứa các hàm gọi API tới JSON Server
import axios from 'axios';

// Cấu hình Base URL cho JSON Server
// JSON Server đang chạy trên cổng 3002 
const API = axios.create({
  baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        console.error('API Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};

export const getPayments = async () => {
    try {
        const response = await API.get('/payments');
        return response.data;
    } catch (error) {
        console.error('API Error fetching payments:', error);
        throw new Error('Failed to fetch payments');
    }
};

export const addPayment = async (payment) => {
    try {
        // Tạo payment object với ID mới
        const paymentWithId = {
            ...payment,
            id: Date.now().toString() // Tạo ID đơn giản
        };
        
        const response = await API.post('/payments', paymentWithId);
        return response.data;
    } catch (error) {
        console.error('API Error adding payment:', error);
        throw new Error('Failed to add payment');
    }
};

export const updatePayment = async (id, payment) => {
    try {
        const response = await API.put(`/payments/${id}`, { ...payment, id });
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

//2. Utility functions for formatting
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
};

//3. Service layer functions với error handling và business logic
export const PaymentService = {
    // Fetch all payments
    fetchAllPayments: async () => {
        try {
            const payments = await getPayments();
            return { success: true, data: payments };
        } catch (error) {
            console.error('Service Error fetching payments:', error);
            return { success: false, error: error.message };
        }
    },

    // Add new payment
    createPayment: async (paymentData) => {
        try {
            // Validate required fields
            if (!paymentData.semester || !paymentData.courseName || !paymentData.amount || !paymentData.date) {
                return { success: false, error: 'All fields are required' };
            }

            // Validate amount
            if (isNaN(paymentData.amount) || paymentData.amount <= 0) {
                return { success: false, error: 'Amount must be a positive number' };
            }

            const newPayment = await addPayment(paymentData);
            return { success: true, data: newPayment };
        } catch (error) {
            console.error('Service Error creating payment:', error);
            return { success: false, error: error.message };
        }
    },

    // Update existing payment
    modifyPayment: async (id, paymentData) => {
        try {
            // Validate required fields
            if (!paymentData.semester || !paymentData.courseName || !paymentData.amount || !paymentData.date) {
                return { success: false, error: 'All fields are required' };
            }

            // Validate amount
            if (isNaN(paymentData.amount) || paymentData.amount <= 0) {
                return { success: false, error: 'Amount must be a positive number' };
            }

            const updatedPayment = await updatePayment(id, paymentData);
            return { success: true, data: updatedPayment };
        } catch (error) {
            console.error('Service Error updating payment:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete payment
    removePayment: async (id) => {
        try {
            if (!id) {
                return { success: false, error: 'Payment ID is required' };
            }

            await deletePayment(id);
            return { success: true, data: id };
        } catch (error) {
            console.error('Service Error deleting payment:', error);
            return { success: false, error: error.message };
        }
    },

    // Get payment details by ID
    getPaymentDetails: async (id) => {
        try {
            if (!id) {
                return { success: false, error: 'Payment ID is required' };
            }

            const payment = await getPaymentById(id);
            return { success: true, data: payment };
        } catch (error) {
            console.error('Service Error fetching payment details:', error);
            return { success: false, error: error.message };
        }
    },

    // Filter and sort payments
    filterPayments: (payments, filters) => {
        let filtered = [...payments];
        
        // Apply search filter
        if (filters.search) {
            filtered = filtered.filter(payment => 
                payment.semester.toLowerCase().includes(filters.search.toLowerCase()) ||
                payment.courseName.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        
        // Apply semester filter
        if (filters.semester) {
            filtered = filtered.filter(payment => payment.semester === filters.semester);
        }
        
        // Apply course name filter
        if (filters.courseName) {
            filtered = filtered.filter(payment => payment.courseName === filters.courseName);
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case 'course_asc':
                    return a.courseName.localeCompare(b.courseName);
                case 'course_desc':
                    return b.courseName.localeCompare(a.courseName);
                case 'date_asc':
                    return new Date(a.date) - new Date(b.date);
                case 'date_desc':
                    return new Date(b.date) - new Date(a.date);
                case 'amount_asc':
                    return a.amount - b.amount;
                case 'amount_desc':
                    return b.amount - a.amount;
                default:
                    return 0;
            }
        });
        
        return filtered;
    }
};

//4.Các hàm API khác có thể được thêm vào đây
