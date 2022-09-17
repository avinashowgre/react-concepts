import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';

import App from './App';
import { Form } from './Form';
import { HeaderNav } from './HeaderNav';
import { Debounce } from './Debounce';
import { Carousel } from './Carousel';
import { Timer } from './Timer';
import { InfiniteScroll } from './InfiniteScroll';
import { VirtualScroll } from './VirtualScroll';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <HeaderNav />
    <div className="container">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="carousel" element={<Carousel />} />
        <Route path="form" element={<Form />} />
        <Route path="debounce" element={<Debounce />} />
        <Route path="timer" element={<Timer />} />
        <Route path="iscroll" element={<InfiniteScroll />} />
        <Route path="vscroll" element={<VirtualScroll />} />
      </Routes>
    </div>
  </BrowserRouter>
);
