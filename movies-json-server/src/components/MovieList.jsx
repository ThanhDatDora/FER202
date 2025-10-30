// Thay thế cho hàm fetchMovies() trong Component
import api from '../api/movieApi'; // Nếu bạn dùng instance

const fetchMovies = async () => {
  try {
    const response = await api.get('/movies'); // Endpoint: /movies
    
    // Axios tự động parse JSON và đặt dữ liệu vào response.data
    const data = response.data; 
    setMovies(data);
    
    console.log('Tổng số bản ghi:', response.headers['x-total-count']); // Truy cập header dễ dàng
  } catch (error) {
    // Xử lý lỗi dễ dàng hơn (ví dụ: error.response.status)
    console.error("Lỗi khi tải danh sách phim:", error.message); 
  }
};
