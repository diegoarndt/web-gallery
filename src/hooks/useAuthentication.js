import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuth } from '../AuthContext';

const useAuthentication = () => {
  const [message, setUserMessage] = useState(null);
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    // Listen for changes in the user's authentication status
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      setIsAuthenticated(user !== null);
    });

    // Unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, [setIsAuthenticated]);

  const authOptions = {
    signIn: 1,
    signUp: 2,
    sendPasswordResetEmail: 3,
  };

  const handleAuthentication = async (email, password, option) => {
    let user = null;

    try {
      if (option === authOptions.signIn) {
        const userCredential = await projectAuth.signInWithEmailAndPassword(
          email,
          password
        );
        user = userCredential.user;
      } else if (option === authOptions.signUp) {
        const userCredential = await projectAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        user = userCredential.user;
      } else if (option === authOptions.sendPasswordResetEmail) {
        await projectAuth.sendPasswordResetEmail(email);
        setUserMessage('Password reset email sent!');
      }
    } catch (error) {
      errorHandler(error, setUserMessage);
    }

    return user;
  };

  return {
    message,
    handleAuthentication,
  };
};

function errorHandler(error, setUserMessage) {
  const errorMap = {
    'auth/weak-password': 'The password is too weak.',
    'auth/wrong-password':
      'The password is invalid or the user does not have a password.',
    'auth/user-not-found':
      'There is no user record corresponding to this e-mail.',
    'auth/email-already-in-use':
      'The email address is already in use by another account.',
    'auth/invalid-email': 'The email address is badly formatted.',
    'auth/too-many-requests': 'Too many requests. Try again later.',
  };
  setUserMessage(errorMap[error.code] || error.message);
}

export default useAuthentication;
