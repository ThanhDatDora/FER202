export const initialMovieState = {
  movies: [],              // Toàn bộ phim từ API
  filteredMovies: [],      // Dữ liệu sau khi lọc / sắp xếp
  genres: [],              // Danh sách thể loại
  loading: false,
  isEditing: null,
  currentMovie: {
    avatar: '',
    title: '',
    description: '',
    genreId: '',
    duration: '',
    year: '',
    country: ''
  },
  showEditModal: false,
  showDeleteModal: false,
  movieToDelete: null,
  // Bộ lọc
  filter: {
    search: '',
    genreId: '',
    duration: '',
    sort: ''
  }
};

// Hàm phụ để áp dụng filter
function applyFilter(movies, filter) {
  let result = [...movies];

  // Tìm kiếm theo tên
  if (filter.search) {
    const keyword = filter.search.toLowerCase();
    result = result.filter(m =>
      m.title.toLowerCase().includes(keyword)
    );
  }

  // Lọc theo thể loại
  if (filter.genreId) {
    result = result.filter(m => String(m.genreId) === String(filter.genreId));
  }

  // Lọc theo thời lượng
  if (filter.duration === 'short') {
    result = result.filter(m => m.duration <= 100);
  } else if (filter.duration === 'medium') {
    result = result.filter(m => m.duration > 100 && m.duration <= 130);
  } else if (filter.duration === 'long') {
    result = result.filter(m => m.duration > 130);
  }

  // Sắp xếp
  if (filter.sort === 'title_asc') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filter.sort === 'title_desc') {
    result.sort((a, b) => b.title.localeCompare(a.title));
  }

  return result;
}

export const movieReducer = (state, action) => {
  switch (action.type) {
    // Khi load phim từ API
    case 'SET_MOVIES': {
      const movies = action.payload || [];
      const filtered = applyFilter(movies, state.filter);
      return { ...state, movies, filteredMovies: filtered, loading: false };
    }

    // Khi load thể loại từ API
    case 'SET_GENRES':
      return { ...state, genres: action.payload };

    // Khi bắt đầu loading
    case 'START_LOADING':
      return { ...state, loading: true };

    // Khi thay đổi field trong form
    case 'UPDATE_FIELD':
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          [action.payload.name]: action.payload.value
        }
      };

    // Mở modal sửa
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        currentMovie: action.payload,
        isEditing: action.payload.id,
        showEditModal: true
      };

    // Đóng modal sửa
    case 'CLOSE_EDIT_MODAL':
      return {
        ...state,
        currentMovie: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false
      };

    // Mở modal xóa
    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        movieToDelete: action.payload,
        showDeleteModal: true
      };

    // Đóng modal xóa
    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        movieToDelete: null,
        showDeleteModal: false
      };

    // Reset form sau khi thêm / sửa xong
    case 'RESET_FORM':
      return {
        ...state,
        currentMovie: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false
      };

    // Cập nhật filter (từ FilterBar)
    case 'SET_FILTER': {
      const newFilter = { ...state.filter, ...action.payload };
      const filtered = applyFilter(state.movies, newFilter);
      return { ...state, filter: newFilter, filteredMovies: filtered };
    }

    default:
      return state;
  }
};
