import React from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
// import './scrollToTopButton.css';

const ScrollToTopButton = ({ visible }) => (
    <button className="topBtn" style={{ display: visible ? 'inline' : 'none' }}>
        <FaArrowCircleUp onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </button>
);

export default ScrollToTopButton;
