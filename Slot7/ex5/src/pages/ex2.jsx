import React from 'react'

const IMG = {
  html5: '/images/images.jpeg',
  bs: '/images/Bootstrap_logo.svg.png',
  css3: '/images/kisspng-cascading-style-sheets-html-web-page-5ae55eb45423e6.4422717315249814283446.jpg'
}

export default function FirstBootstrapPage() {
  return (
    <>
      <header className="bg-light py-5 mb-4">
        <div className="container">
          <h1 className="display-5 fw-semibold text-center">My First Bootstrap Page</h1>
        </div>
      </header>

      <main className="container">
        <div className="row justify-content-center text-center g-4 py-3">
          <div className="col-10 col-sm-6 col-md-4">
            <img src={IMG.html5} alt="HTML5" className="img-fluid" style={{maxHeight: 180}} />
          </div>
          <div className="col-10 col-sm-6 col-md-4">
            <img src={IMG.css3} alt="CSS3" className="img-fluid" style={{maxHeight: 180}} />
          </div>
          <div className="col-10 col-sm-6 col-md-4">
            <img src={IMG.bs} alt="Bootstrap" className="img-fluid" style={{maxHeight: 180}} />
          </div>
        </div>
      </main>
    </>
  )
}
