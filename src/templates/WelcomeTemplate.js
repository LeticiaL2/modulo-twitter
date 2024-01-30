import AuthModal from '../components/organisms/AuthModal';
import Button from '../components/atoms/Button';
import './WelcomeTemplate.css';

const WelcomeTemplate = ({ show, isLogin, showModal, hideModal }) => (
  <div className="welcome--container">
    <AuthModal show={show} handleClose={hideModal} isLogin={isLogin} />
    <div className="welcome--left">
      <img src="x_icon.png" alt="Welcome" />
    </div>
    <div className="welcome--right">
      <h1>Acontecendo agora</h1>
      <h4>Inscreva-se hoje</h4>
      <Button
        type="button"
        onClick={() => showModal(false)}
        className="welcome--create-account-btn"
      >
        Criar conta
      </Button>
      <div className="welcome--separator-container">
        <div className="welcome--separator-line"></div>
        <span className="welcome--separator-text">ou</span>
        <div className="welcome--separator-line"></div>
      </div>
      <p>Já tem uma conta?</p>
      <Button
        type="button"
        onClick={() => showModal(true)}
        className="welcome--sign-in-btn"
      >
        Entrar
      </Button>
    </div>
  </div>
);

export default WelcomeTemplate;
