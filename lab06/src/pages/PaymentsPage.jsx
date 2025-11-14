import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, selectPayments, selectSuccessfulPayments } from '../store/paymentsSlice';

export default function PaymentsPage() {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const success = useSelector(selectSuccessfulPayments);
  const [amount, setAmount] = useState('');

  const handleCreate = () => {
    dispatch(createPayment({ amount: Number(amount), method: 'CARD', status: 'SUCCESS' }));
    setAmount('');
  };

  return (
    <div>
      <h2>Payments</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleCreate}>Create Payment</button>

      <h3>All Payments:</h3>
      <pre>{JSON.stringify(payments, null, 2)}</pre>

      <h3>Successful Payments:</h3>
      <pre>{JSON.stringify(success, null, 2)}</pre>
    </div>
  );
}
