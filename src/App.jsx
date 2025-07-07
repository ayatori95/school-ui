import React from 'react';
import { Outlet } from 'react-router-dom';
// import Navbar from './components/layout/Navbar'; // Exemplo
// import Footer from './components/layout/Footer'; // Exemplo

function App() {
  return (
    <div className="app-container">
      {/* <Navbar /> */}
      <main>
        {/* O conteúdo das nossas rotas será renderizado aqui */}
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
