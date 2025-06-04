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
            <li><a href="#">Termos e Condições</a></li>
            <li><a href="Politica">Política de Privacidade</a></li>
          </ul>
        </div>
        <div>
          <h3>Acompanhe a gente</h3>
          <div className="footer-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="src/assets/instaaaaa.png" alt="Instagram" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="src/assets/facebook.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="src/assets/twitter.png" alt="Twitter" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
