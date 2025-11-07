// src/contexts/MovieContext.jsx
import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/moviesApi';

// Contexts
export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

// Custom Hooks
export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  // READ: lấy danh sách phim
  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const res = await movieApi.get('/movies');
      const movies = res.data || [];
      dispatch({ type: 'SET_MOVIES', payload: movies });
      dispatch({ type: 'SET_FILTERED_MOVIES', payload: movies });
    } catch (err) {
      console.error('Lỗi khi tải danh sách phim:', err);
      dispatch({ type: 'SET_MOVIES', payload: [] });
      dispatch({ type: 'SET_FILTERED_MOVIES', payload: [] });
    }
  }, []);

  // READ: lấy danh sách thể loại
  const fetchGenres = useCallback(async () => {
    try {
      const res = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: res.data || [] });
    } catch (err) {
      console.error('Lỗi khi tải danh sách thể loại:', err);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  // DELETE
  const confirmDelete = useCallback(
    async (id) => {
      if (id === undefined || id === null) return;

      const numericId = Number(id); // 👈 ép số để chắc chắn trùng với json-server
      // đóng modal trước
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
      // xóa local ngay để UI biến mất liền
      dispatch({ type: 'DELETE_LOCAL_MOVIE', payload: numericId });
      // loading
      dispatch({ type: 'START_LOADING' });

      try {
        await movieApi.delete(`/movies/${numericId}`);
        // load lại để đồng bộ với db.json
        await fetchMovies();
      } catch (err) {
        console.error('Lỗi khi xóa phim:', err);
        // nếu lỗi, vẫn fetch về trạng thái thật
        await fetchMovies();
      }
    },
    [fetchMovies]
  );

  // CREATE / UPDATE
  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, isEditingId) => {
      dispatch({ type: 'START_LOADING' });
      try {
        if (isEditing) {
          const numericId = Number(isEditingId);
          await movieApi.put(`/movies/${numericId}`, dataToSend);
        } else {
          await movieApi.post('/movies', dataToSend);
        }

        dispatch({ type: 'RESET_FORM' });
        await fetchMovies();
        return true;
      } catch (err) {
        console.error('Lỗi thao tác CREATE/UPDATE:', err);
        await fetchMovies();
        return false;
      }
    },
    [fetchMovies]
  );

  // chạy lần đầu
  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
    setFilteredMovies: (list) =>
      dispatch({ type: 'SET_FILTERED_MOVIES', payload: list }),
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
