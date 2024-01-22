import React from 'react';
import SignUp from '../molecules/SignUp';
import SignIn from '../molecules/SignIn';
import './AuthModal.css';

const AuthModal = ({ handleClose, show, children, isLogin }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="modal-close" onClick={handleClose}>x</div>
                {isLogin ? <SignIn /> : <SignUp />}
            </section>
        </div>
    );
};

export default AuthModal;
