import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import Imagem from "../../assets/logor.png"; // Importação correta

    const Navbar = () => {
     return (
     <nav className="navbar navbar-expand-lg custom-navbar">
     <div className="container">
     <img src={Imagem} alt="Logo" className="imagem" /> {/* Logo antes do nome */}
     <a className="navbar-brand custom-brand ms-2" href="#">Vacinici</a>
      <button

      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
        >

          <span className="navbar-toggler-icon"></span>
           </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-3">
            <li className="nav-item">
            <a className="nav-link custom-link" href="#">Entrar</a>
            </li>

            <li className="nav-item">
            <a className="nav-link custom-link" href="#">Sobre</a>
            </li>

            <li className="nav-item">
            <a className="nav-link custom-link" href="#">Contato</a>
            </li>







          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;