import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';
import './Login.scss';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [option, setOption] = React.useState(1);
  const [signUpError, setSignUpError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, message, handleAuthentication } =
    useAuthentication();

  useEffect(() => {
    setIsAuthenticated(isAuthenticated);

    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 50%, 70%)`;
    localStorage.setItem('bgColor', randomColor);

    document.body.style.backgroundColor = randomColor;
  }, [isAuthenticated, setIsAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignUpError(null);

    // Check if the repeat-password matches the password
    const repeatPassword = e.target['repeat-password']?.value;

    if (option === 2 && password !== repeatPassword) {
      setSignUpError('Passwords do not match');
      return;
    }

    // Call the handleSignIn function from useAuthentication
    const user = await handleAuthentication(email, password, option);
    if (user) {
      setIsAuthenticated(true);
      navigate('/');
    }
  };

  // Handle changes in the email field
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle changes in the password field
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='container'>
      <h1 className='project-name'>Web Gallery</h1>
      <header>
        <div
          className={
            'header-headings ' +
            (option === 1 ? 'sign-in' : option === 2 ? 'sign-up' : 'forgot')
          }
        >
          <span>Sign in to your account</span>
          <span>Create an account</span>
          <span>Reset your password</span>
        </div>
      </header>
      <ul className='options'>
        <li
          key='1'
          className={option === 1 ? 'active' : ''}
          onClick={() => {
            setOption(1);
            setSignUpError('');
          }}
        >
          Sign in
        </li>
        <li
          key='2'
          className={option === 2 ? 'active' : ''}
          onClick={() => {
            setOption(2);
            setSignUpError('');
          }}
        >
          Sign up
        </li>
        <li
          key='3'
          className={option === 3 ? 'active' : ''}
          onClick={() => {
            setOption(3);
            setSignUpError('');
          }}
        >
          Forgot
        </li>
      </ul>
      <Form
        option={option}
        email={email}
        password={password}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleSubmit}
        signUpError={signUpError}
        message={message}
      />
    </div>
  );
};

export default Login;

function Form({
  option,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  signUpError,
  message,
}) {
  return (
    <form className='account-form' onSubmit={onSubmit}>
      <div
        className={
          'account-form-fields ' +
          (option === 1 ? 'sign-in' : option === 2 ? 'sign-up' : 'forgot')
        }
      >
        <input
          id='email'
          name='email'
          type='email'
          placeholder='E-mail'
          required
          value={email}
          onChange={onEmailChange}
        />
        <input
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          required={option === 1 || option === 2 ? true : false}
          disabled={option === 3 ? true : false}
          value={password}
          onChange={onPasswordChange}
        />
        <input
          id='repeat-password'
          name='repeat-password'
          type='password'
          placeholder='Repeat password'
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
        />
      </div>
      <span className='error-message'>{signUpError ?? message}</span>
      <button className='btn-submit-form' type='submit'>
        {option === 1 ? 'Sign in' : option === 2 ? 'Sign up' : 'Reset password'}
      </button>
    </form>
  );
}
