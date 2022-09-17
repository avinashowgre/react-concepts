import React from 'react';
import { Link } from 'react-router-dom';

export function HeaderNav() {
  return (
    <nav
      style={{
        borderBottom: 'solid 1px',
        paddingBottom: '1rem',
      }}
    >
      <Link to="/">Home</Link> | <Link to="/form">Form</Link> |{' '}
      <Link to="/debounce">Debounce</Link> |{' '}
      <Link to="/carousel">Carousel</Link> | <Link to="/timer">Timer</Link> |{' '}
      <Link to="/iscroll">Infinite Scroll</Link> |{' '}
      <Link to="/vscroll">Virtual Scroll </Link>
    </nav>
  );
}
