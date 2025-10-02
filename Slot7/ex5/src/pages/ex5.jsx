export default function App(){
  const BANNER = './images/fpt.jpeg'
  const students = [
    { id:'DE150182', name:'Nguyễn Hữu Quốc Khánh', province:'Đà Nẵng',  img:'./images/chup-chan-dung-4.jpg' },
    { id:'DE160377', name:'Choy Vĩnh Thiện',       province:'Quảng Nam', img:'./images/chup-chan-dung-4.jpg' },
    { id:'DE160547', name:'Đỗ Nguyên Phúc',        province:'Quảng Nam', img:'./images/chup-chan-dung-4.jpg' },
    { id:'DE170049', name:'Lê Hoàng Minh',         province:'Đà Nẵng',   img:'./images/chup-chan-dung-4.jpg' }
  ]

  return (
    <>
      {/* Header */}
      <header className="header-band">
        <div className="container d-flex justify-content-between align-items-center py-2">
          <div className="d-flex align-items-center">
            <img src="/images/fptu.png" alt="FPTU" style={{maxHeight:40}} className="me-2"/>
            <nav className="small">
              <a href="/" className="me-2 text-white text-decoration-none">Trang chủ</a>
              <a href="https://fpt.edu.vn" className="me-2 text-white text-decoration-none">Ngành học</a>
              <a href="https://tuyensinh.fpt.edu.vn" className="me-2 text-white text-decoration-none">Tuyển sinh</a>
              <span className="text-white-50">Sinh viên</span>
            </nav>
          </div>
          <form className="d-flex align-items-center" role="search" onSubmit={(e)=>e.preventDefault()}>
            <label className="me-1 text-white" htmlFor="q">Search:</label>
            <input id="q" type="search" className="form-control form-control-sm" placeholder="Tìm kiếm..." />
          </form>
        </div>
      </header>

      {/* Banner */}
      <div className="text-center">
        <img src={BANNER} alt="Banner" className="img-fluid w-100"/>
      </div>

      {/* Breadcrumb */}
      <div className="container my-2">
        <nav style={{'--bs-breadcrumb-divider': "'/'"}} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Students</li>
          </ol>
        </nav>
      </div>

      {/* Students Detail */}
      <main className="container my-4">
        <h2 className="text-center mb-4">Students Detail</h2>
        <div className="row g-4">
          {students.map(st=>(
            <div className="col-md-6" key={st.id}>
              <div className="card student-card h-100 shadow-sm">
                <img src={st.img} className="card-img-top" alt={st.name}/>
                <div className="card-body">
                  <div className="d-flex justify-content-between small text-muted mb-2">
                    <span>{st.id}</span>
                    <span>{st.province}</span>
                  </div>
                  <p className="fw-semibold mb-2">{st.name}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name={st.id} id={st.id+'-a'} />
                        <label className="form-check-label" htmlFor={st.id+'-a'}>Absent</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name={st.id} id={st.id+'-p'} />
                        <label className="form-check-label" htmlFor={st.id+'-p'}>Present</label>
                      </div>
                    </div>
                    <button className="btn btn-warning btn-sm" type="button">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer mt-5 pt-4">
        <div className="container">
          <div className="row gy-3">
            <div className="col-md-6">
              <h6>Our Address</h6>
              <ul className="list-unstyled mb-0 small">
                <li>Khu đô thị FPT Đà Nẵng</li>
                <li>+84 236 3711111</li>
                <li>+84 236 3655421</li>
                <li>daihocfpt@fpt.edu.vn</li>
              </ul>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="small mb-2">Follow us:</div>
          
              <div className="d-flex gap-2 justify-content-md-end">
                <a href="https://google.com"   className="btn btn-outline-light btn-sm">Google</a>
                <a href="https://facebook.com" className="btn btn-outline-light btn-sm">Facebook</a>
                <a href="https://linkedin.com" className="btn btn-outline-light btn-sm">LinkedIn</a>
                <a href="https://twitter.com"  className="btn btn-outline-light btn-sm">Twitter</a>
                <a href="mailto:info@example.com" className="btn btn-outline-light btn-sm">Email</a>
              </div>
              <small className="d-block mt-3">© Copyright 2023</small>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
