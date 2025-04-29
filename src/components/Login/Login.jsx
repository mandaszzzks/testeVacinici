import { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setError('Por favor, preencha o usuário e a senha para continuar.');
      return;
    }

    setError('');
    console.log('Login válido! Redirecionando...');
    window.location.href = '/Enter';
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validations = [
    { regex: /.{8,10}/, label: '8 a 10 caracteres' },
    { regex: /[a-z]/, label: 'letra minúscula' },
    { regex: /[A-Z]/, label: 'letra maiúscula' },
    { regex: /\d/, label: 'número' },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, label: 'símbolo (Ex: !@#)' },
  ];

  return (
    <div className="login-page vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-75 shadow-lg rounded p-5 login-box">
        
        {/* Seção de Login */}
        <div className="col-md-6 d-flex flex-column login-title">
          <h2 className="fw-bold">Seja bem-vindo de volta!</h2>
          <p className="frase4"><strong>Preencha seus dados pessoais.</strong></p>

          <form onSubmit={handleSubmit}>
            <div className="form-input mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="position-relative form-input mb-2">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control pe-5"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={10}
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            {/* Validação de senha */}
            <div className="password-rules small text-start mb-3 bg-light p-2 rounded">
              {validations.map(({ regex, label }, index) => (
                <div key={index} className={regex.test(password) ? 'text-success' : 'text-danger'}>
                  {regex.test(password) ? '✔' : '✖'} {label}
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-dark w-100 btn-login mt-2">Entrar</button>
          </form>
        </div>

        {/* Seção de Ilustração */}
        <div className="col-md-6 bg-light d-flex flex-column align-items-center justify-content-center rounded login-right">
          <img src="src/assets/vaciniilus.png" alt="Illustration" className="img-fluid" />
        </div>
      </div>

      {/* Toast de erro embutido */}
      {error && (
        <div className="toast-error">
          {error}
        </div>
      )}
    </div>
  );
}
