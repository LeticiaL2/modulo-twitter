import { useState } from 'react';
import HomeTemplate from '../templates/HomeTemplate';

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
    <HomeTemplate
      show={show}
      isLogin={isLogin}
      showModal={showModal}
      hideModal={hideModal}
    />
  );
};

export default HomePage;
