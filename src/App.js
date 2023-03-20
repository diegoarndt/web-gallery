import React, { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import NavBar from './comps/NavBar';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import Login from './comps/Login';
import Footer from './comps/Footer';
import { AuthProvider, useAuth } from './AuthContext';

const Gallery = ({ handleLogout }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleImgClick = (img) => {
    setSelectedImg(img);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImg(null);
    setShowModal(false);
  };

  return (
    <>
      <NavBar handleLogout={handleLogout} />
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={handleImgClick} />
      {showModal && <Modal selectedImg={selectedImg} closeModal={closeModal} />}
      <Footer />
    </>
  );
};

function App() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    handleLogout,
    loading,
  } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              {isAuthenticated ? (
                <Gallery handleLogout={handleLogout} />
              ) : (
                <Navigate to='/signin' />
              )}
            </>
          }
        />
        <Route
          path='/signin'
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </div>
  );
}

const WrappedApp = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default WrappedApp;