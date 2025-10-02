export default function Ex3(){
  return (
    <>
      <header className="page-hero">
        <div className="container py-5">
          <h1 className="display-6 fw-bold">Let's test the grid!</h1>
        </div>
      </header>

      <main className="container my-4">
        <ul className="nav mb-3">
          <li className="nav-item"><button className="nav-link active btn btn-link p-0" type="button">Active</button></li>
          <li className="nav-item"><button className="nav-link btn btn-link p-0" type="button">Link</button></li>
          <li className="nav-item"><button className="nav-link btn btn-link p-0" type="button">Link</button></li>
          <li className="nav-item"><span className="nav-link disabled">Disabled</span></li>
        </ul>

        <div className="border p-3 mx-auto" style={{maxWidth:860}}>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6"><div className="p-3 border bg-body-secondary">First col</div></div>
            <div className="col-12 col-md-6"><div className="p-3 border bg-body-secondary">Second col</div></div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-8"><div className="p-3 border bg-body-secondary">col</div></div>
            <div className="col-6 col-md-2"><div className="p-3 border bg-body-secondary">col</div></div>
            <div className="col-6 col-md-2"><div className="p-3 border bg-body-secondary">col</div></div>
          </div>
          <div className="row g-3">
            <div className="col-12 col-md-5"><div className="p-3 border bg-body-secondary">col</div></div>
            <div className="col-12 col-md-4"><div className="p-3 border bg-body-secondary">col</div></div>
            <div className="col-12 col-md-3"><div className="p-3 border bg-body-secondary">col</div></div>
          </div>
        </div>
      </main>

      <footer className="py-2 mt-4" style={{background:'#d3c6c7'}}>
        <div className="container">
          <h2 className="text-center fw-bold">Created by ABC!</h2>
        </div>
      </footer>
    </>
  )
}
