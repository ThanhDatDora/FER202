export default function App(){
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">Pizza House</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="nav" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-3 me-auto">
              <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>

            <form className="d-flex" role="search" onSubmit={(e)=>e.preventDefault()}>
              <input className="form-control form-control-sm me-2" type="search" placeholder="Search" />
              <button className="btn btn-danger btn-sm" type="submit">
                <span className="text-white">Search</span>
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* HERO / CAROUSEL */}
      <header className="pt-5" style={{marginTop:56}}>
        <div id="hero" className="carousel slide hero" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
     

              <img src="./images/images (1).jpeg" className="d-block w-100" alt="Pizza 1" />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="display-6 fw-semibold">Neapolitan Pizza</h2>
                <p>If you are looking for traditional Italian pizza, the Neapolitan is the best option!</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="./images/images.jpeg" className="d-block w-100" alt="Pizza 2" />
            </div>
            <div className="carousel-item">
              <img src="./images/Bootstrap_logo.svg.jpg" className="d-block w-100" alt="Pizza 3" />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#hero" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#hero" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
          
        </div>
      </header>

      {/* MENU SECTION */}
      <section className="section-dark py-5">
        <div className="container">
          <h3 className="mb-4" style={{fontFamily:'Georgia, serif'}}>Our Menu</h3>

          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="card position-relative h-100">
                <span className="ribbon">SALE</span>
                <img src="./images/20220211142645-margherita-9920_e41233d5-dcec-461c-b07e-03245f031dfe.jpg" className="card-img-top" alt="Margherita" />
                <div className="card-body">
                  <h6 className="card-title mb-1">Margherita Pizza</h6>
                  <div className="small text-muted mb-2">
                    <del className="me-2">$40.00</del><span className="text-danger fw-bold">$24.00</span>
                  </div>
                  <button className="btn btn-buy w-100">Buy</button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="card position-relative h-100">
                <img src="./images/36107allies-mushroom-pizzafabeveryday4x3-005f809371b147378094d60f28daf212.jpg" className="card-img-top" alt="Mushroom" />
                <div className="card-body">
                  <h6 className="card-title mb-1">Mushroom Pizza</h6>
                  <div className="small text-muted mb-2">$25.00</div>
                  <button className="btn btn-buy w-100">Buy</button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="card position-relative h-100">
                <span className="ribbon">NEW</span>
                <img src="./images/hawaiian-pizza-index-65f4641de4b08.avif" className="card-img-top" alt="Hawaiian" />
                <div className="card-body">
                  <h6 className="card-title mb-1">Hawaiian Pizza</h6>
                  <div className="small text-muted mb-2">$30.00</div>
                  <button className="btn btn-buy w-100">Buy</button>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="card position-relative h-100">
                <span className="ribbon">SALE</span>
                <img src="./images/k_Photo_Recipes_2024-05-pesto-pizza_pesto-pizza-348.jpeg" className="card-img-top" alt="Pesto" />
                <div className="card-body">
                  <h6 className="card-title mb-1">Pesto Pizza</h6>
                  <div className="small text-muted mb-2">
                    <del className="me-2">$50.00</del><span className="text-danger fw-bold">$30.00</span>
                  </div>
                  <button className="btn btn-buy w-100">Buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK YOUR TABLE */}
      <section className="section-dark pb-5">
        <div className="container">
          <h3 className="text-center mb-4 book-title">Book Your Table</h3>

          <form className="row g-3">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Your Name *" required />
            </div>
            <div className="col-md-4">
              <input type="email" className="form-control" placeholder="Your Email *" required />
            </div>
            <div className="col-md-4">
              <select className="form-select" defaultValue="">
                <option value="" disabled>Select a Service</option>
                <option>Dine-in</option>
                <option>Delivery</option>
                <option>Takeaway</option>
              </select>
            </div>

            <div className="col-12">
              <textarea className="form-control" rows="6" placeholder="Please write your comment"></textarea>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-warning px-4">Send Message</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
