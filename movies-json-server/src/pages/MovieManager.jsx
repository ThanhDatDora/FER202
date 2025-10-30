import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';

function MovieManagerContent() {
  return (
    <>
      <Header />
      <Container className="mt-2">
        <h1 className="text-center mb-4">🎬 Quản lý Phim (Context + useReducer + Axios)</h1>
        <FilterBar />
        <MovieForm />
        <h2 className="mt-4">Danh sách Phim</h2>
        <MovieTable />
      </Container>
    </>
  );
}

export default function MovieManager() {
  return (
    <MovieProvider>
      <MovieManagerContent />
    </MovieProvider>
  );
}
