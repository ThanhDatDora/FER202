//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Import useAuth
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage'; 
import AddPayment from '../pages/AddPayment';
import PaymentDetails from '../pages/PaymentDetails';
import EditPayment from '../pages/EditPayment';

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children }) => {
    // Lấy trực tiếp isAuthenticated từ useAuth()
    const { isAuthenticated } = useAuth(); 
    
    // Nếu chưa đăng nhập, chuyển hướng đến /login
    return isAuthenticated ? children : <Navigate to="/login" />;
};

// Component để bảo vệ trang login (không cho truy cập khi đã login)
const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    
    // Nếu đã đăng nhập, chuyển hướng đến /home
    return isAuthenticated ? <Navigate to="/home" /> : children;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* 1. Trang mặc định: Chuyển hướng đến /home nếu đã đăng nhập, ngược lại là /login */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                {/* 2. Trang Đăng nhập */}
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                
                {/* 3. Định nghĩa route bảo vệ cho Trang Chủ/Dashboard (yêu cầu: /home ) */}
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            {/* Component Trang chủ/Dashboard */}
                            <DashboardPage /> 
                        </PrivateRoute>
                    } 
                />
                
                {/* 4. Route để thêm payment mới */}
                <Route 
                    path="/add-payment" 
                    element={
                        <PrivateRoute>
                            <AddPayment />
                        </PrivateRoute>
                    } 
                />
                
                {/* 5. Route để xem chi tiết payment */}
                <Route 
                    path="/payment-details/:id" 
                    element={
                        <PrivateRoute>
                            <PaymentDetails />
                        </PrivateRoute>
                    } 
                />
                
                {/* 6. Route để chỉnh sửa payment */}
                <Route 
                    path="/edit-payment/:id" 
                    element={
                        <PrivateRoute>
                            <EditPayment />
                        </PrivateRoute>
                    } 
                />
                
                {/* 7. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

