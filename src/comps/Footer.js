import React from 'react';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>Arndt & Akoshile & Kareer Web Gallery Co. © {currentYear}</footer>
  );
};

export default Footer;
