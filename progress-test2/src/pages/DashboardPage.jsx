import React from 'react';
import { Container, Card } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import { PaymentProvider } from '../contexts/PaymentContext';

const DashboardPage = () => {
      
    return (
        <PaymentProvider>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />
            {/* 2. Main Dashboard Content (Grid và Card) */}
            <Container>
                <FilterBar />
                <PaymentTable />
                <Card className="mb-4 shadow-sm">
                    <Card.Header as="h5">Dashboard Overview</Card.Header>
                    <Card.Body>
                        {/* Nội dung chính của Dashboard sẽ được hiển thị ở đây */}
                        <p>Chào mừng đến với hệ thống quản lý học phí TuitionTracker!</p>
                        <p>Sử dụng bộ lọc ở trên để tìm kiếm và sắp xếp các khoản thanh toán học phí.</p>
                    </Card.Body>
                </Card>
            </Container>
        </PaymentProvider>    
    );
};export default DashboardPage;
