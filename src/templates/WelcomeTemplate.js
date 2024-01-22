import React from 'react';
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
            <h1>Happening now</h1>
            <h4>Join today.</h4>
            <Button type="button" onClick={() => showModal(false)} className="welcome--create-account-btn">Create account</Button>
            <div className="welcome--separator-container">
                <div className="welcome--separator-line"></div>
                <span className="welcome--separator-text">or</span>
                <div className="welcome--separator-line"></div>
            </div>
            <p>Already have an account?</p>
            <Button type="button" onClick={() => showModal(true)} className="welcome--sign-in-btn">Sign in</Button>
        </div>
    </div>
);

export default WelcomeTemplate;
