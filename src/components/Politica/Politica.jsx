import React from "react";
import "./Politica.css";

export default function Politica() {
  return (
    <div className="politica-container">
      <div className="politica-box">
        <h1 className="politica-title">Política de Privacidade</h1>

        <p className="politica-text">
          Sua privacidade é nossa prioridade. Esta Política de Privacidade explica detalhadamente como coletamos, utilizamos e protegemos suas informações de maneira segura e transparente.
        </p>

        <h2 className="politica-subtitle">1. Informações Coletadas</h2>
        <p className="politica-text">
          Podemos coletar informações como nome, e-mail, telefone e dados de navegação para oferecer um serviço otimizado. Coletamos apenas o necessário para melhorar sua experiência e garantir um atendimento eficiente.
          Além disso, utilizamos tecnologias como cookies para entender melhor suas preferências e personalizar conteúdos de acordo com seus interesses.
        </p>

        <h2 className="politica-subtitle">2. Uso das Informações</h2>
        <p className="politica-text">
          Suas informações são utilizadas para fornecer, aprimorar e personalizar nossos serviços. Garantimos que seus dados não serão usados para fins diferentes sem seu consentimento explícito.
        
          Também utilizamos seus dados para aprimorar a segurança da plataforma, prevenir fraudes e atender às exigências legais e regulatórias.
        </p>

        <h2 className="politica-subtitle">3. Compartilhamento de Dados</h2>
        <p className="politica-text">
          Não vendemos ou comercializamos suas informações pessoais. O compartilhamento de dados ocorre apenas com parceiros de confiança, sempre sob contratos rigorosos que garantem a confidencialidade e segurança das informações.
        
          Quando necessário, podemos compartilhar dados com autoridades legais, sempre respeitando as regulamentações de proteção de dados vigentes.
        </p>

        <h2 className="politica-subtitle">4. Segurança dos Dados</h2>
        <p className="politica-text">
          Adotamos medidas rigorosas para proteger suas informações contra acessos não autorizados, uso indevido, perda ou alteração. Nossa segurança inclui criptografia avançada, firewalls robustos e monitoramento constante contra ameaças digitais.
      
          Nossa equipe de segurança realiza auditorias periódicas e está sempre aprimorando nossas práticas para garantir a máxima proteção de seus dados.
        </p>

        <h2 className="politica-subtitle">5. Seus Direitos</h2>
        <p className="politica-text">
          Você tem total controle sobre seus dados. É possível solicitar a exclusão, atualização ou modificação de suas informações a qualquer momento. Basta entrar em contato conosco para exercer seus direitos.
      
          Além disso, respeitamos todas as regulamentações aplicáveis, como a LGPD (Lei Geral de Proteção de Dados) e o GDPR (Regulamento Geral sobre a Proteção de Dados da União Europeia).
        </p>

        <h2 className="politica-subtitle">6. Cookies e Tecnologias de Rastreamento</h2>
        <p className="politica-text">
          Utilizamos cookies para melhorar sua experiência, entender seu comportamento de navegação e oferecer conteúdos relevantes. Você pode gerenciar suas preferências de cookies a qualquer momento nas configurações do seu navegador.
      
          Para garantir total transparência, oferecemos uma seção dedicada a cookies onde explicamos detalhadamente quais tipos utilizamos e como você pode controlá-los.
        </p>

        <h2 className="politica-subtitle">7. Alterações na Política</h2>
        <p className="politica-text">
          Podemos atualizar esta Política de Privacidade periodicamente para refletir melhorias em nossos serviços ou mudanças nas leis de proteção de dados. Qualquer alteração significativa será comunicada a você de forma clara e acessível.
       
          Recomendamos que revise esta Política regularmente para estar sempre informado sobre como protegemos seus dados.
        </p>

        <h2 className="politica-subtitle">8. Contato</h2>
        <p className="politica-text">
          Caso tenha dúvidas sobre nossa Política de Privacidade, entre em contato com nossa equipe de suporte. Estamos disponíveis para esclarecer qualquer questão e garantir sua total segurança e confiança ao utilizar nossos serviços.
      
          Você pode nos contatar por e-mail, telefone ou através do nosso canal de suporte no site.
        </p>


        <a href="/Bottom" className="politica-button">Voltar</a>
      </div>
    </div>
  );
}