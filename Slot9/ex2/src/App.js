import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import AppNavBar from './components/layout/AppNavBar.jsx';
import HomePage from './pages/HomePage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import FooterPage from './pages/FooterPage.jsx';

export default function App() {
  const [view, setView] = useState('home');
  const [quick, setQuick] = useState('');

  const handleNavigate = (where) => {
    // Tối thiểu: chỉ 2 trang
    if (where === 'account') setView('account');
    else setView('home');
    // Debug:
    // console.log('navigate ->', where);
  };

  const handleSearch = (q) => setQuick(q);

  return (
    <div>
      <AppNavBar onNavigate={handleNavigate}
                 onSearch={handleSearch}
                 favCount={JSON.parse(localStorage.getItem('favourites')||'[]').length} />

      {view === 'home' && <HomePage quickSearch={quick} />}
      {view === 'account' && <AccountPage />}

      <FooterPage />
    </div>
  );
}
