import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    document.body.style.backgroundColor = localStorage.getItem('bgColor');
  }, []);

  return (
    <>
      <NavBar handleLogout={handleLogout} />
      <main>
        <Title />
        <UploadForm />
        <ImageGrid setSelectedImg={handleImgClick} />
        {showModal && (
          <Modal selectedImg={selectedImg} closeModal={closeModal} />
        )}
      </main>
      <Footer />
    </>
  );
};

function App() {
  const { isAuthenticated, setIsAuthenticated, handleLogout, loading } =
    useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  const HslToRgb = (h, s, l) => {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hueToRgb = function (p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
      b * 255
    )})`;
  };

  const ConvertHslToRgb = (hslColor) => {
    // Extract the hue, saturation, and lightness values from the HSL color string
    const [h, s, l] = hslColor.match(/\d+/g);

    // Convert the HSL color to RGB
    const rgbColor = HslToRgb(h / 360, s / 100, l / 100);

    const colorValues = rgbColor
      .replace(/[^\d,]/g, '')
      .split(',')
      .map((value) => parseInt(value));

    const colorLabels = ['red', 'green', 'blue'];

    const colorSpans = colorValues.map((value, index) => (
      <React.Fragment key={index}>
        <span
          style={{
            backgroundColor: colorLabels[index],
            padding: '0.1rem',
          }}
        >
          {value}
        </span>
        <span>{index < colorValues.length - 1 ? ', ' : ''}</span>
      </React.Fragment>
    ));

    return (
      <>
        <span style={{ fontWeight: 'bold' }}>rgb(</span>
        {colorSpans}
        <span style={{ fontWeight: 'bold' }}>)</span>
      </>
    );
  };

  return (
    <>
      <div className='app'>
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
      {isAuthenticated ? null : (
        <div>
          Randomly selected background color:&nbsp;
          {ConvertHslToRgb(localStorage.getItem('bgColor'))}
        </div>
      )}
    </>
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
