import { Link, NavLink } from 'react-router-dom'

export default function MainNav(){
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Bootstrap Exercises</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item"><NavLink className="nav-link" to="/ex1">ex1</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ex2">ex2</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ex3">ex3</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ex4">ex4</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ex5">ex5</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
