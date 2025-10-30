import React, { createContext, useReducer, useContext } from 'react';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Khởi tạo trạng thái ban đầu
const initialState = { 
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

// 3. Định nghĩa hàm reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { 
        ...state, 
        loading: true, 
        error: null 
      };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        loading: false, 
        error: null,
        isAuthenticated: true
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        user: null, 
        loading: false, 
        error: action.payload,
        isAuthenticated: false
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        loading: false, 
        error: null,
        isAuthenticated: false
      };
    case 'CLEAR_ERROR':
      return { 
        ...state, 
        error: null 
      };
    default: 
      return state;
  }
}

// 4. Tạo Provider Component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 5. Dữ liệu mẫu thay thế cho API call
  const mockAccounts = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: '123456',
      role: 'admin',
      status: 'active'
    },
    {
      id: 2,
      username: 'user1',
      email: 'user1@example.com',
      password: '123456',
      role: 'user',
      status: 'active'
    },
    {
      id: 3,
      username: 'user2',
      email: 'user2@example.com',
      password: '123456',
      role: 'user',
      status: 'locked'
    }
  ];

  // 6. Hàm đăng nhập (thay thế API call bằng mock data)
  function login(identifier, password) {
    // Bắt đầu quá trình đăng nhập
    dispatch({ type: 'LOGIN_START' });

    // Giả lập API call với setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const isEmail = identifier.includes('@');
        
        // Tìm kiếm tài khoản theo email hoặc username
        const account = mockAccounts.find(acc => {
          if (isEmail) {
            return acc.email === identifier && acc.password === password;
          } else {
            return acc.username === identifier && acc.password === password;
          }
        });

        if (!account) {
          // Không tìm thấy tài khoản hoặc sai mật khẩu
          dispatch({ 
            type: 'LOGIN_FAILURE', 
            payload: 'Invalid credentials.' 
          });
          resolve({ ok: false, message: 'Invalid credentials.' });
          return;
        }

        // Kiểm tra trạng thái tài khoản
        if (account.status === 'locked') {
          dispatch({ 
            type: 'LOGIN_FAILURE', 
            payload: 'Account is locked. Please contact administrator.' 
          });
          resolve({ ok: false, message: 'Account is locked. Please contact administrator.' });
          return;
        }

        // Kiểm tra role - chỉ cho phép admin đăng nhập
        if (account.role !== 'admin') {
          dispatch({ 
            type: 'LOGIN_FAILURE', 
            payload: 'Access denied. Only admin users can login' 
          });
          resolve({ ok: false, message: 'Access denied. Only admin users can login' });
          return;
        }

        // Đăng nhập thành công
        const userInfo = {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role,
          status: account.status
        };

        dispatch({ type: 'LOGIN_SUCCESS', payload: userInfo });
        resolve({ ok: true, account: userInfo });
      }, 1000); // Giả lập delay 1 giây
    });
  }

  // 7. Hàm đăng xuất
  function logout() { 
    dispatch({ type: 'LOGOUT' }); 
  }

  // 8. Hàm xóa lỗi
  function clearError() {
    dispatch({ type: 'CLEAR_ERROR' });
  }

  // 9. Giá trị context
  const contextValue = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 10. Custom hook để sử dụng AuthContext
export function useAuth() { 
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;

