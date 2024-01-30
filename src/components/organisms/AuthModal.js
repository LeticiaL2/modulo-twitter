import SignUp from '../molecules/SignUp';
import SignIn from '../molecules/SignIn';
import './AuthModal.css';

const AuthModal = ({ handleClose, show, children, isLogin }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const formSizeClassName = isLogin ? 'modal-small' : 'modal-big';

  return (
    <div className={showHideClassName}>
      <section className={`modal-main ${formSizeClassName}`}>
        <div className="modal-close" onClick={handleClose}>
          x
        </div>
        {isLogin ? (
          <SignIn handleClose={handleClose} />
        ) : (
          <SignUp handleClose={handleClose} />
        )}
      </section>
    </div>
  );
};

export default AuthModal;
