import { useEffect } from 'react'

export default function Ex1Grid(){
  useEffect(()=>{document.title='ex1'},[])
  return (
    <>
      <header className="page-hero">
        <div className="container py-5">
          <h1 className="display-6 fw-bold">Let's test the grid!</h1>
        </div>
      </header>

      <main className="container my-4">
        <div className="border p-3 mx-auto grid-wrap">
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6"><div className="grid-box">First col</div></div>
            <div className="col-12 col-md-6"><div className="grid-box">Second col</div></div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-8"><div className="grid-box">col</div></div>
            <div className="col-6 col-md-2"><div className="grid-box">col</div></div>
            <div className="col-6 col-md-2"><div className="grid-box">col</div></div>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-5"><div className="grid-box">col</div></div>
            <div className="col-12 col-md-4"><div className="grid-box">col</div></div>
            <div className="col-12 col-md-3"><div className="grid-box">col</div></div>
          </div>
        </div>
      </main>

      <footer className="footer-band py-2 mt-4">
        <div className="container">
          <h2 className="text-center fw-bold">Created by ABC!</h2>
        </div>
      </footer>
    </>
  )
}
