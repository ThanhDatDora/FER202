// src/contexts/PaymentContext.jsx
import React, {
  createContext, useContext, useEffect, useMemo, useReducer, useCallback,
} from 'react';
import * as api from '../services/api';

const PaymentContext = createContext();

const initialState = {
  items: [],
  loading: false,
  error: null,
  filter: { semester: '', course: '', search: '' },
  sort: 'date_desc',
  totalAmount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_SUCCESS':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        items: state.items.map((x) => (x.id === action.payload.id ? action.payload : x)),
      };
    case 'DELETE_SUCCESS':
      return { ...state, items: state.items.filter((x) => x.id !== action.payload) };
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'RECALC_TOTAL':
      return { ...state, totalAmount: action.payload };
    default:
      return state;
  }
}

export function PaymentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const recalcTotal = useCallback((items) => {
    const total = items.reduce((s, p) => s + Number(p.amount || 0), 0);
    dispatch({ type: 'RECALC_TOTAL', payload: total });
  }, []);

  const fetchPayments = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await api.getPayments();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
      recalcTotal(data);
    } catch (e) {
      dispatch({ type: 'FETCH_ERROR', payload: e.message || 'Failed to fetch payments' });
    }
  }, [recalcTotal]);

  const addPayment = async (payload) => {
    const created = await api.createPayment(payload);
    const next = [...state.items, created];
    dispatch({ type: 'ADD_SUCCESS', payload: created });
    recalcTotal(next);
    return created;
  };

  const updatePayment = async (id, payload) => {
    const updated = await api.updatePayment(id, payload);
    const next = state.items.map((x) => (x.id === id ? updated : x));
    dispatch({ type: 'UPDATE_SUCCESS', payload: updated });
    recalcTotal(next);
    return updated;
  };

  const deletePayment = async (id) => {
    await api.deletePayment(id);
    const next = state.items.filter((x) => x.id !== id);
    dispatch({ type: 'DELETE_SUCCESS', payload: id });
    recalcTotal(next);
  };

  const setFilter = (patch) => dispatch({ type: 'SET_FILTER', payload: patch });
  const setSort = (value) => dispatch({ type: 'SET_SORT', payload: value });

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const filteredSorted = useMemo(() => {
    let rows = [...state.items];
    const toLower = (v) => String(v || '').toLowerCase();
    const { semester, course, search } = state.filter;

    if (semester) rows = rows.filter((r) => toLower(r.semester).includes(semester.toLowerCase()));
    if (course) rows = rows.filter((r) => toLower(r.courseName).includes(course.toLowerCase()));
    if (search)
      rows = rows.filter(
        (r) => toLower(r.semester).includes(search.toLowerCase()) ||
               toLower(r.courseName).includes(search.toLowerCase())
      );

    switch (state.sort) {
      case 'course_asc':
        rows.sort((a, b) => toLower(a.courseName).localeCompare(toLower(b.courseName)));
        break;
      case 'course_desc':
        rows.sort((a, b) => toLower(b.courseName).localeCompare(toLower(a.courseName)));
        break;
      case 'date_asc':
        rows.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
        break;
      case 'date_desc':
        rows.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        break;
      case 'amount_asc':
        rows.sort((a, b) => Number(a.amount || 0) - Number(b.amount || 0));
        break;
      case 'amount_desc':
        rows.sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0));
        break;
      default:
        break;
    }
    return rows;
  }, [state.items, state.filter, state.sort]);

  const value = {
    items: filteredSorted,
    rawItems: state.items,
    loading: state.loading,
    error: state.error,
    totalAmount: state.totalAmount,
    filter: state.filter,
    sort: state.sort,
    fetchPayments,
    addPayment,
    updatePayment,
    deletePayment,
    setFilter,
    setSort,
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
}

export const usePayments = () => useContext(PaymentContext);
