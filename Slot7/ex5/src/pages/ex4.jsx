export default function Ex4(){
  const LOGO = './images/Logo_FPT_Education.png'
  return (
    <>
      <header className="py-4" style={{background:'#e79a43'}}>
        <div className="container text-center">
          <img src={LOGO} alt="FPT University" className="img-fluid" style={{maxWidth:520}}/>
        </div>

        <nav>
          <div className="container">
            <ul className="nav justify-content-center small py-1">
              <li className="nav-item"><a className="nav-link px-2 text-white" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link px-2 text-white" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link px-2 text-white" href="#contact">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="py-4" style={{background:'#fff'}}>
        <div className="container py-5">
          <section id="about" className="text-center mb-5">
            <h2 className="fw-bold mb-3">About</h2>
            <p className="text-muted mb-0">This is the about section of the website.</p>
          </section>

          <section id="contact" className="text-center">
            <h2 className="fw-bold mb-3">Contact</h2>
            <p className="text-muted mb-0">For any inquiries, please contact us at example@example.com.</p>
          </section>
        </div>
      </main>

      <footer className="py-3" style={{background:'#e79a43'}}>
        <div className="container text-center text-white-50">
          <small>© 2023 Website. All rights reserved.</small>
        </div>
      </footer>
    </>
  )
}
