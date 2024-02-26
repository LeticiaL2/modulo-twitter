import { useState } from 'react';
import AuthModal from '../../components/organisms/AuthModal/AuthModal';
import Button from '../../components/atoms/Button/Button';
import Image from '../../components/atoms/Image/Image';
import './HomePage.scss';

const HomePage = () => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const showModal = (login) => {
    setIsLogin(login);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <div className="home--container">
      <AuthModal show={show} handleClose={hideModal} isLogin={isLogin} />
      <div className="home--left">
        <Image variant="homeLeftImage" src="x_icon.png" />
      </div>
      <div className="home--right">
        <h1>Acontecendo agora</h1>
        <h4>Inscreva-se hoje</h4>
        <Button
          variant="homeCreateAccountBtn"
          type="button"
          onClick={() => showModal(false)}
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
          variant="homeSignInBtn"
          type="button"
          onClick={() => showModal(true)}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
