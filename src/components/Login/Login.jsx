import './Login.css'; // <- Isso é essencial!



export default function Login() {
  
  return (
    <div className="login-page vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-75 shadow-lg rounded p-5 login-box">
        
        {/* Seção de Login */}
        <div className="col-md-6 d-flex flex-column login-title">
          <h2 className="fw-bold">Seja bem-vindo de volta!</h2>
          <p className="frase4"><strong>Preencha seus dados pessoais.</strong></p>
          
          <form>
            <div className="mb-3 form-input">
              <input type="text" className="form-control" placeholder="Username" />
            </div>
            <div className="mb-3 position-relative form-input">
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <button className="btn btn-dark w-100 btn-login">Entrar</button>
          </form>
        </div>
        
        {/* Seção de Ilustração */}
        <div className="col-md-6 bg-light d-flex flex-column align-items-center justify-content-center rounded login-right">
          <img src="src/assets/vaciniilus.png" alt="Illustration" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}
