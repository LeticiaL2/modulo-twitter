import { useState } from 'react';
import WelcomeTemplate from '../templates/WelcomeTemplate';

const WelcomePage = () => {
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
    <WelcomeTemplate
      show={show}
      isLogin={isLogin}
      showModal={showModal}
      hideModal={hideModal}
    />
  );
};

export default WelcomePage;
