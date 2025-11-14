// PaymentContext.jsx – quản lý dữ liệu thanh toán bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { PaymentService } from '../services/api';

const PaymentContext = createContext();

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

    case 'SET_FILTER': {
      const newFilters = { ...state.filters, [action.field]: action.value };
      return {
        ...state,
        filters: newFilters,
        filteredPayments: PaymentService.filterPayments(state.payments, newFilters)
      };
    }

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: { search: '', semester: '', courseName: '', sortBy: 'course_asc' },
        filteredPayments: state.payments
      };

    case 'ADD_PAYMENT_SUCCESS': {
      const newPayments = [...state.payments, action.payload];
      return {
        ...state,
        payments: newPayments,
        filteredPayments: PaymentService.filterPayments(newPayments, state.filters)
      };
    }

    case 'UPDATE_PAYMENT_SUCCESS': {
      const updatedPayments = state.payments.map(p =>
        p.id === action.payload.id ? action.payload : p
      );
      return {
        ...state,
        payments: updatedPayments,
        filteredPayments: PaymentService.filterPayments(updatedPayments, state.filters)
      };
    }

    case 'DELETE_PAYMENT_SUCCESS': {
      const remaining = state.payments.filter(p => p.id !== action.payload);
      return {
        ...state,
        payments: remaining,
        filteredPayments: PaymentService.filterPayments(remaining, state.filters)
      };
    }

    default:
      return state;
  }
};

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);

  const fetchPayments = async () => {
    dispatch({ type: 'FETCH_PAYMENTS_START' });

    const result = await PaymentService.fetchAllPayments();

    if (result.success) {
      dispatch({ type: 'FETCH_PAYMENTS_SUCCESS', payload: result.data });
    } else {
      dispatch({ type: 'FETCH_PAYMENTS_FAILURE', payload: result.error });
    }
  };

  const setFilter = (field, value) => {
    dispatch({ type: 'SET_FILTER', field, value });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const addPayment = async (paymentData) => {
    const result = await PaymentService.createPayment(paymentData);

    if (result.success) {
      dispatch({ type: 'ADD_PAYMENT_SUCCESS', payload: result.data });
      return { success: true, payment: result.data };
    }
    return { success: false, error: result.error };
  };

  const updatePayment = async (id, paymentData) => {
    const result = await PaymentService.modifyPayment(id, paymentData);

    if (result.success) {
      dispatch({ type: 'UPDATE_PAYMENT_SUCCESS', payload: result.data });
      return { success: true, payment: result.data };
    }
    return { success: false, error: result.error };
  };

  const deletePayment = async (id) => {
    const result = await PaymentService.removePayment(id);

    if (result.success) {
      dispatch({ type: 'DELETE_PAYMENT_SUCCESS', payload: id });
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const getPaymentById = async (id) => {
    const result = await PaymentService.getPaymentDetails(id);

    if (result.success) {
      return { success: true, payment: result.data };
    }
    return { success: false, error: result.error };
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        payments: state.payments,
        filteredPayments: state.filteredPayments,
        loading: state.isLoading,
        error: state.error,
        filters: state.filters,

        fetchPayments,
        setFilter,
        clearFilters,
        addPayment,
        updatePayment,
        deletePayment,
        getPaymentById,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
