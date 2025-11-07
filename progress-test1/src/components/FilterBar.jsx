// FilterBar.jsx
// ✅ BẢN FIX HOÀN CHỈNH – Giữ nguyên comment và bổ sung xử lý thật
import React, { useState, useMemo, useEffect } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';

const FilterBar = () => {

    /* 
        ✅ Giả định có state quản lý filter/sort được truyền từ PaymentContext (comment gốc)
        ⬇️ Thực tế: bây giờ chúng ta kết nối trực tiếp vào PaymentContext
    */
    const { rawItems, filter, sort, setFilter, setSort } = usePayments();

    // ✅ Tạo danh sách Semester & Course từ dữ liệu JSON (rawItems)
    const { semesterOptions, courseOptions } = useMemo(() => {
        const semesters = Array.from(new Set(rawItems.map(i => i.semester).filter(Boolean)));
        const courses = Array.from(new Set(rawItems.map(i => i.courseName).filter(Boolean)));

        return {
            semesterOptions: semesters.sort(),
            courseOptions: courses.sort((a, b) => String(a).localeCompare(String(b)))
        };
    }, [rawItems]);

    // ✅ State local để người dùng nhập → sync vào PaymentContext
    const [search, setSearch] = useState(filter.search || '');
    const [semester, setSemester] = useState(filter.semester || '');
    const [course, setCourse] = useState(filter.course || '');
    const [sortValue, setSortValue] = useState(sort || 'date_desc');

    // ✅ Đồng bộ các state vào PaymentContext
    useEffect(() => { setFilter({ search }); }, [search, setFilter]);
    useEffect(() => { setFilter({ semester }); }, [semester, setFilter]);
    useEffect(() => { setFilter({ course }); }, [course, setFilter]);
    useEffect(() => { setSort(sortValue); }, [sortValue, setSort]);

    // ✅ Nút reset tất cả filter
    const clearFilters = () => {
        setSearch('');
        setSemester('');
        setCourse('');
        setSortValue('date_desc');
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">

                        {/* ✅ Search by semester or course name  */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by semester or course name"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        {/* ✅ Filter by Semester  */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Semester</Form.Label>
                                <Form.Select
                                    value={semester}
                                    onChange={(e) => setSemester(e.target.value)}
                                >
                                    <option value="">All Semesters</option>
                                    {semesterOptions.map((sem) => (
                                        <option key={sem} value={sem}>{sem}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* ✅ Filter by Course name */}
                        <Col xs={6} md={4} lg={3}>
                            <Form.Group>
                                <Form.Label>Lọc theo Course</Form.Label>
                                <Form.Select
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                >
                                    <option value="">All Courses</option>
                                    {courseOptions.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* ✅ Sorting */}
                        <Col xs={12} md={4} lg={3}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select
                                    value={sortValue}
                                    onChange={(e) => setSortValue(e.target.value)}
                                >
                                    <option value="course_asc">Course name ascending</option>
                                    <option value="course_desc">Course name descending</option>
                                    <option value="date_asc">Date ascending</option>
                                    <option value="date_desc">Date descending</option>
                                    <option value="amount_asc">Amount ascending</option>
                                    <option value="amount_desc">Amount descending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* ✅ Nút Clear Filters */}
                        <Col xs={12}>
                            <Button variant="secondary" onClick={clearFilters}>
                                Clear filters
                            </Button>
                        </Col>

                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;
