//PaymentContext.jsx quản lý dữ liệu thanh toán bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { PaymentService } from '../services/api';

// 1. Tạo Context
const PaymentContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialPaymentState = {
    payments: [],
    filteredPayments: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',
        semester: '',
        courseName: '',
        sortBy: 'course_asc'
    }
};

// 3. Tạo hàm reduce để quản lý các hành động liên quan đến payments
const paymentReducer = (state, action) => {
    switch (action.type) { 
        case 'FETCH_PAYMENTS_START':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_PAYMENTS_SUCCESS':
            return { 
                ...state, 
                isLoading: false, 
                payments: action.payload,
                filteredPayments: action.payload,
                error: null 
            };
        case 'FETCH_PAYMENTS_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        case 'SET_FILTER':
            const newFilters = { ...state.filters, [action.field]: action.value };
            return {
                ...state,
                filters: newFilters,
                filteredPayments: PaymentService.filterPayments(state.payments, newFilters)
            };
        case 'CLEAR_FILTERS':
            return {
                ...state,
                filters: { search: '', semester: '', courseName: '', sortBy: 'course_asc' },
                filteredPayments: state.payments
            };
        case 'ADD_PAYMENT_SUCCESS':
            const newPaymentsAfterAdd = [...state.payments, action.payload];
            return {
                ...state,
                payments: newPaymentsAfterAdd,
                                filteredPayments: PaymentService.filterPayments(action.payload.payments, state.filters)
            };
        case 'UPDATE_PAYMENT_SUCCESS':
            const updatedPayments = state.payments.map(payment => 
                payment.id === action.payload.id ? action.payload : payment
            );
            return {
                ...state,
                payments: updatedPayments,
                filteredPayments: PaymentService.filterPayments(updatedPayments, state.filters)
            };
        case 'DELETE_PAYMENT_SUCCESS':
            const remainingPayments = state.payments.filter(payment => payment.id !== action.payload);
            return {
                ...state,
                payments: remainingPayments,
                filteredPayments: PaymentService.filterPayments(remainingPayments, state.filters)
            };
        default:
            return state;
    }
};

// 5. Tạo PaymentProvider để cung cấp Context cho các component con
export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);

    // Fetch payments từ API
    const fetchPayments = async () => {
        dispatch({ type: 'FETCH_PAYMENTS_START' });
        
        const result = await PaymentService.fetchAllPayments();
        
        if (result.success) {
            dispatch({ type: 'FETCH_PAYMENTS_SUCCESS', payload: result.data });
        } else {
            dispatch({ type: 'FETCH_PAYMENTS_FAILURE', payload: result.error });
        }
    };

    // Set filter
    const setFilter = (field, value) => {
        dispatch({ type: 'SET_FILTER', field, value });
    };

    // Clear filters
    const clearFilters = () => {
        dispatch({ type: 'CLEAR_FILTERS' });
    };

    // Add new payment
    const addPayment = async (paymentData) => {
        const result = await PaymentService.createPayment(paymentData);
        
        if (result.success) {
            dispatch({ type: 'ADD_PAYMENT_SUCCESS', payload: result.data });
            return { success: true, payment: result.data };
        } else {
            return { success: false, error: result.error };
        }
    };

    // Update payment
    const updatePayment = async (id, paymentData) => {
        const result = await PaymentService.modifyPayment(id, paymentData);
        
        if (result.success) {
            dispatch({ type: 'UPDATE_PAYMENT_SUCCESS', payload: result.data });
            return { success: true, payment: result.data };
        } else {
            return { success: false, error: result.error };
        }
    };

    // Delete payment
    const deletePayment = async (id) => {
        const result = await PaymentService.removePayment(id);
        
        if (result.success) {
            dispatch({ type: 'DELETE_PAYMENT_SUCCESS', payload: id });
            return { success: true };
        } else {
            return { success: false, error: result.error };
        }
    };

    // Get payment by ID
    const getPaymentById = async (id) => {
        const result = await PaymentService.getPaymentDetails(id);
        
        if (result.success) {
            return { success: true, payment: result.data };
        } else {
            return { success: false, error: result.error };
        }
    };

    // Load payments khi component mount
    useEffect(() => {
        fetchPayments();
    }, []);

    // 6. Cung cấp trực tiếp các giá trị cần thiết qua Context value
    const contextValue = {
        // Trạng thái từ Reducer
        payments: state.payments,
        filteredPayments: state.filteredPayments,
        loading: state.isLoading,
        error: state.error,
        filters: state.filters,
        
        // Actions
        fetchPayments,
        setFilter,
        clearFilters,
        addPayment,
        updatePayment,
        deletePayment,
        getPaymentById,
    };

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );
};

// 7. Tạo custom hook để sử dụng PaymentContext dễ dàng hơn
export const usePayment = () => useContext(PaymentContext);
