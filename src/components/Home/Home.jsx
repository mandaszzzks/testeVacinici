import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Imagem from "../../assets/sla.png"; // Imagem principal do aplicativo
import VideoSrc from "../../assets/video.mp4"; // Vídeo explicativo

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Area
} from "recharts";

const Home = () => {
  const data = [
    { year: 1980, semVacinas: 10, comVacinas: 10 },
    { year: 1985, semVacinas: 9.2, comVacinas: 8.8 },
    { year: 1990, semVacinas: 8.5, comVacinas: 7.4 },
    { year: 1995, semVacinas: 7.7, comVacinas: 6.2 },
    { year: 2000, semVacinas: 6.9, comVacinas: 5 },
    { year: 2005, semVacinas: 6.1, comVacinas: 4.2 },
    { year: 2010, semVacinas: 5.4, comVacinas: 3.3 },
    { year: 2015, semVacinas: 4.6, comVacinas: 2.6 },
    { year: 2020, semVacinas: 4.0, comVacinas: 2.0 },
  ];

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

        {/* Seção de Testemunhos e Gráfico lado a lado */}
        <section className="testimonials py-5">
          <div className="saiba">
            <h3>Saiba mais</h3>
          </div>

          <div className="saiba2">
            <p>Sobre nosso aplicativo e vacinas:</p>
          </div>

          <div className="row">
            {/* Testemunhos */}
            <div className="col-md-6">
              <div className="testimonials-grid">
                {[{
                  nome: "Cátia", texto: "Esse app facilitou muito o meu acesso à minha carteira de vacinação.", imagem: "src/assets/catia.png", titulo: "Incrível!"
                }, {
                  nome: "John", texto: "O design é intuitivo e me avisa automaticamente sobre vacinas.", imagem: "src/assets/john.png", titulo: "Excelente!"
                }, {
                  nome: "Ricardo", texto: "O app mantém minhas vacinas organizadas e acessíveis.", imagem: "src/assets/ricardo.png", titulo: "Magnífico!"
                }, {
                  nome: "Ana", texto: "Sinto confiança em acompanhar minha vacinação por aqui.", imagem: "src/assets/ana.png", titulo: "Seguro!"
                }].map((t, i) => (
                  <div className="card" key={i}>
                    <div className="card-header">
                      <img src={t.imagem} alt={t.nome} />
                    </div>
                    <div className="card-body">
                      <h3>{t.titulo}</h3>
                      <p>{t.texto}</p>
                      <footer className="blockquote-footer">{t.nome}</footer>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico */}
            <div className="col-md-6" style={{ paddingLeft: '140px' }}>
              <div className="d-flex flex-column align-items-start" style={{ marginTop: '40px' }}>
                <h2 className="text-center mb-4 titulo">Impacto das Vacinas na Mortalidade</h2>

                <ResponsiveContainer width={700} height={550}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 12]} tickFormatter={(tick) => `${tick}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="semVacinas"
                      stroke="#d62728"
                      strokeDasharray="5 5"
                      name="Sem Vacinas"
                    />
                    <Line
                      type="monotone"
                      dataKey="comVacinas"
                      stroke="#1f77b4"
                      name="Com Vacinas"
                    />
                    <Area
                      type="monotone"
                      dataKey="semVacinas"
                      stroke={false}
                      fill="#fdd"
                      fillOpacity={0.3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Seção informativa */}
        <div className="col-12 frase1">
          <h2>Para que serve a vacinação?</h2>
          <p className="subtitulo">
            Redução de Doenças: A vacinação ajudou a reduzir a incidência de doenças como sarampo, poliomielite, difteria e tétano em mais de 90% globalmente.
            <br />
            Impacto Econômico: A cada US$ 1 investido em programas de vacinação, estima-se que há um retorno de US$ 44 em benefícios de saúde.
            <br />
            Erradicação de Doenças: A varíola foi erradicada em 1980 graças a campanhas de vacinação em massa.
            <br />
            Prevenção de Mortes: Estima-se que vacinas previnem cerca de 2 a 3 milhões de mortes por ano, segundo a OMS.
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
