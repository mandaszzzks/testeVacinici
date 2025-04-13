import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>Serviços</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Termos e Condições </a></li>
            <li><a href="#">Política de Privacidade</a></li>
          </ul>
        </div>
        <div>
          <h3>Sobre a gente</h3>
          <ul>
            <li><a href="#">Our story</a></li>
            <li><a href="#">News</a></li>
          </ul>
        </div>
        <div>
          <h3>Acompanhe a gente </h3>
          <div className="footer-icons">
          <img src="src\assets\imagem_2025-03-30_154947541-removebg-preview.png" alt="Descrição da kakakak" />
          <img src="src\assets\facebook.png" alt="Descrição da kakakak" />
          <img src="src\assets\twitter.png" alt="Descrição da kakakak" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
