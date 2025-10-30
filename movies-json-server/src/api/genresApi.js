import http from './http';
export const listGenres = () => http.get('/genres');
