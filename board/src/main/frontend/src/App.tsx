import React from 'react';
import logo from './logo.svg';
import './App.css';

import Board from './pages/Board';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Pray from "./pages/Pray";
import Register from "./pages/Register";
import PageDetail from "./pages/PageDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <>
                    <Route index element={<Board/>}/>

                    <Route path="/practice" element={<Pray/>}/>

                    <Route path="/register" element={<Register/>}/>

                    <Route path="/pageDetail" element={<PageDetail/>}/>

                    <Route path="/pageDetail/:id" element={<PageDetail/>}/>

                </>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
