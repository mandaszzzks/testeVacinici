import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Imagem from "../../assets/sla.png"; // Imagem principal do aplicativo
import VideoSrc from "../../assets/video.mp4"; // Vídeo explicativo
import GraficoImg from "../../assets/grafico.png"; // Imagem ilustrativa

const Home = () => {
  return (
    <section className="home-background">
      <div className="container">

        {/* Seção de Texto e Descrição */}
        <div className="row align-items-start">
          <div className="col-md-6 grouptext">
            <h1 className="text-dark text1">
              Sua carteira de vacina sempre com você
            </h1>
            <p className="text text2">
              Com nosso aplicativo mobile, você pode facilmente acessar e armazenar sua
              carteira de vacinação, tornando o processo mais rápido e seguro. Instale agora e
              tenha suas vacinas sempre à mão!
            </p>
          </div>

          {/* Imagem do Aplicativo */}
          <div className="col-md-6 text-right">
            <img src={Imagem} alt="Aplicativo de Vacinação" className="sla" />
          </div>
        </div>

  

        {/* Seção de Testemunhos */}
        <section className="testimonials py-5">
          <h2 className="text-center mb-5">O que dizem nossos usuários?</h2>

          <div className="testimonials-grid">
            {/* Testemunho 1 */}
            <div className="card">
              <div className="card-header">
                <img src="src/assets/catia.png" alt="Ícone de casa" />
              </div>
              <div className="card-body">
                <h3>Incrível!</h3>
                <p>Esse app facilitou muito o meu acesso à minha carteira de vacinação.</p>
                <footer className="blockquote-footer">Cátia</footer>
              </div>
            </div>

    {/* Imagem Ilustrativa 
    <div className="col-12 text-center mt-4">
          <img
            src={GraficoImg}
            alt="Imagem ilustrativa"
            className="grafico"
          />
        </div>
        */}
        
            {/* Testemunho 2 */}
            <div className="card">
              <div className="card-header">
                <img src="src/assets/john.png" alt="Ícone de notificação" />
              </div>
              <div className="card-body">
                <h3>Excelente!</h3>
                <p>O design é intuitivo e me avisa automaticamente sobre vacinas.</p>
                <footer className="blockquote-footer">John</footer>
              </div>
            </div>

            {/* Testemunho 3 */}
            <div className="card">
              <div className="card-header">
                <img src="src/assets/ricardo.png" alt="Ícone de organização" />
              </div>
              <div className="card-body">
                <h3>Magnifico!</h3>
                <p>O app mantém minhas vacinas organizadas e acessíveis.</p>
                <footer className="blockquote-footer">Ricardo</footer>
              </div>
            </div>

            {/* Testemunho 4 */}
            <div className="card">
              <div className="card-header">
                <img src="src/assets/ana.png" alt="Ícone de segurança" />
              </div>
              <div className="card-body">
                <h3>Seguro!</h3>
                <p>Sinto confiança em acompanhar minha vacinação por aqui.</p>
                <footer className="blockquote-footer">Ana</footer>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Vídeo */}
        <div className="col-12 text-center mt-4">
          <div className="embed-responsive embed-responsive-16by9">
            <video className="embed-responsive-item" autoPlay loop muted>
              <source src={VideoSrc} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
