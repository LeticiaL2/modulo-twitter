import AuthModal from '../components/organisms/AuthModal';
import Button from '../components/atoms/Button';
import Image from '../components/atoms/Image';

const HomeTemplate = ({ show, isLogin, showModal, hideModal }) => (
  <div className="home--container">
    <AuthModal show={show} handleClose={hideModal} isLogin={isLogin} />
    <div className="home--left">
      <Image src="x_icon.png" />
    </div>
    <div className="home--right">
      <h1>Acontecendo agora</h1>
      <h4>Inscreva-se hoje</h4>
      <Button
        type="button"
        onClick={() => showModal(false)}
        className="home--create-account-btn"
      >
        Criar conta
      </Button>
      <div className="home--separator-container">
        <div className="home--separator-line"></div>
        <span className="home--separator-text">ou</span>
        <div className="home--separator-line"></div>
      </div>
      <p>Já tem uma conta?</p>
      <Button
        type="button"
        onClick={() => showModal(true)}
        className="home--sign-in-btn"
      >
        Entrar
      </Button>
    </div>
  </div>
);

export default HomeTemplate;
