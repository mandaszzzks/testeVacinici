export default function Login() {
    return (
        
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row w-75 shadow-lg rounded p-5 bg-white login-box">
          
  
          {/* Seção de Login */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">Seja bem-vindo de volta!</h2>
            <p className="fr"><strong>Preencha seus dados pessoais.</strong></p>
            
            <form>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Username" />
              </div>
              <div className="mb-3 position-relative">
                <input type="password" className="form-control" placeholder="Password" />
              </div>
              {/* Botão de Entrar */}
              <button className="btn btn-dark w-100">Entrar</button>
            </form>
          </div>
          
          {/* Seção de Ilustração */}
          <div className="col-md-6 bg-light d-flex flex-column align-items-center justify-content-center rounded">
            <img src="src/assets/vaciniilus.png" alt="Illustration" className="img-fluid" />
          </div>
        </div>
      
      </div>
    );
  }
  