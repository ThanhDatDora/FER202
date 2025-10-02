import { useState } from 'react'
import Ex1 from './pages/ex1'
import Ex2 from './pages/ex2'
import Ex3 from './pages/ex3'
import Ex4 from './pages/ex4'
import Ex5 from './pages/ex5'

export default function App() {
  const [page, setPage] = useState('ex5') // mặc định mở ex5, đổi sang 'ex1' nếu muốn

  const NavButton = ({ id, label }) => (
    <button
      type="button"
      onClick={() => setPage(id)}
      className={`btn btn-sm ${page === id ? 'btn-primary' : 'btn-outline-primary'}`}
    >
      {label}
    </button>
  )

  return (
    <>
      <nav className="navbar bg-body-tertiary border-bottom">
        <div className="container d-flex align-items-center gap-2">
          <span className="navbar-brand fw-bold">Bootstrap Exercises</span>
          <div className="ms-auto d-flex gap-2">
            <NavButton id="ex1" label="ex1" />
            <NavButton id="ex2" label="ex2" />
            <NavButton id="ex3" label="ex3" />
            <NavButton id="ex4" label="ex4" />
            <NavButton id="ex5" label="ex5" />
          </div>
        </div>
      </nav>

      {page === 'ex1' && <Ex1 />}
      {page === 'ex2' && <Ex2 />}
      {page === 'ex3' && <Ex3 />}
      {page === 'ex4' && <Ex4 />}
      {page === 'ex5' && <Ex5 />}
    </>
  )
}
