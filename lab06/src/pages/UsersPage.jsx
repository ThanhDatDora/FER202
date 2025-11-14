import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  toggleAdminStatus,
  selectUsers,
  selectUsersLoading,
  selectUsersError
} from '../store/usersSlice';

export default function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div role="alert">{String(error)}</div>;
  if (!users || users.length === 0) return <div>No users</div>;

  return (
    <ul style={{ display: 'grid', gap: 8, padding: 0, listStyle: 'none' }}>
      {users.map((u) => {
        const id = u.id ?? u.userId ?? u._id;
        const name = u.name ?? u.fullName ?? u.username ?? u.email ?? `User ${id}`;
        const isAdmin = Boolean(u.isAdmin);
        return (
          <li key={id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span>{name}</span>
            <span>{isAdmin ? 'Admin' : 'User'}</span>
            <button type="button" onClick={() => dispatch(toggleAdminStatus(id))}>
              Toggle Admin
            </button>
          </li>
        );
      })}
    </ul>
  );
}
