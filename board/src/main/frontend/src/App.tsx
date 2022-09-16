import React from 'react';
import logo from './logo.svg';
import './App.css';

import Board from './pages/Board';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Pray from "./pages/Pray";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <>
                        <Route index element={<Board/>} />

                        <Route path="practice" element={<Pray/>} />
                </>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
