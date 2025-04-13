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
          <div className="saiba">
            <h3>Saiba mais</h3>
          </div>

          <div className="saiba2">
          <p> Sobre nosso aplicativo e vacinas:        </p>
          </div>

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


        <div className="grafico">
   <img src="src\assets\grafico.png" alt="Descrição da kakakak" />
   </div>


             
        <div className="col-12 frase1">
  <h2>Para que serve a vacinação?</h2>
  <p className="subtitulo">
      Redução de Doenças: A vacinação ajudou a reduzir a incidência de doenças como sarampo, poliomielite
      , difteria e tétano em mais de 90% globalmente.<p></p>
      Impacto Econômico: A cada US$ 1 investido em programas de vacinação, estima-se que há um retorno de US$ 44 em benefícios de saúde.<p></p>
      Erradicação de Doenças: A varíola foi erradicada em 1980 graças a campanhas de vacinação em massa.
      <p></p>
      Prevenção de Mortes: Estima-se que vacinas prevenem cerca de 2 a 3 milhões de mortes por ano, de acordo com a Organização Mundial da Saúde (OMS).
        </p>
    </div>

        {/* Seção de Vídeo */}
        <div className="col-12 text-center mt-4">
  <div className="video-container">
    <video className="video" autoPlay loop muted>
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
