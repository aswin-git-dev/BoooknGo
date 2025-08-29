import React from 'react'
import { Routes, Route } from 'react-router-dom';


import BookHotel from '../pages/BookHotel';
const routes=() => {
  return (
    <Routes>
        <Route path="/" element={<BookHotel />}/>
    </Routes>
  );
}

export default routes;