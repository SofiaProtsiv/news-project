import { Routes, Route } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';
import Preloader from '../components/preloader';

import Home from '../views/home';
import Favorite from '../views/favorite';
import Read from '../views/read';

import './App.scss';
import { Suspense } from 'react';

function App() {

  return (

    <div className="page__wrapper">
      <Header />
      <main className="page__container">

        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/favorite" element={<Favorite />} />
            <Route exact path="/read" element={<Read />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>

  );
}

export default App;
