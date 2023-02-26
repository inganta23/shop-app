import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import Guard from './components/Guard';
import Navbar from './components/Navbar';
import Product from './components/Product';
import About from './pages/About';
import Home from './pages/Home';
import Main from './pages/Main';
import { MyStore } from './pages/MyStore';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthGuard>
                            <Home />
                        </AuthGuard>
                    }
                />
                <Route
                    path="/main"
                    element={
                        <Guard>
                            <Navbar>
                                <Main />
                            </Navbar>
                        </Guard>
                    }
                >
                    <Route path=":productId" element={<Product />} />
                </Route>
                <Route
                    path="/mystore"
                    element={
                        <Guard>
                            <Navbar>
                                <MyStore />
                            </Navbar>
                        </Guard>
                    }
                >
                    <Route
                        path=":productId"
                        element={
                            <Guard>
                                <Navbar>
                                    <Product isMyStore={true} />
                                </Navbar>
                            </Guard>
                        }
                    />
                </Route>
                <Route
                    path="/about"
                    element={
                        <Guard>
                            <Navbar>
                                <About />
                            </Navbar>
                        </Guard>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
