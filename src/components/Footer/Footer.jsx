import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>Sobre nós</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Termos e Condições </a></li>
            <li><a href="Politica">Política de Privacidade</a></li>
          </ul>
        </div>
        <div>
          <h3>Acompanhe a gente </h3>
          <div className="footer-icons">
          <img src="src\assets\instaaaaa.png" alt="Descrição da kakakak" />
          <img src="src\assets\facebook.png" alt="Descrição da kakakak" />
          <img src="src\assets\twitter.png" alt="Descrição da kakakak" />
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
