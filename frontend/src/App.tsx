import { useEffect, useState } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Product from './components/Product';
import About from './pages/About';
import Home from './pages/Home';
import Main from './pages/Main';
import { MyStore } from './pages/MyStore';

function App() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isHome, setIsHome] = useState(false);
    const [loading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        if (searchParams.get('menu')) setIsHome(true);
        else setIsHome(false);
        setIsLoading(false);
    }, [searchParams]);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/main"
                    element={
                        <Navbar>
                            <Main />
                        </Navbar>
                    }
                >
                    <Route
                        path=":productId"
                        element={
                            <Navbar>
                                <Product />
                            </Navbar>
                        }
                    />
                </Route>
                <Route
                    path="/mystore"
                    element={
                        <Navbar>
                            <MyStore />
                        </Navbar>
                    }
                >
                    <Route
                        path=":productId"
                        element={
                            <Navbar>
                                <Product isMyStore={true} />
                            </Navbar>
                        }
                    />
                </Route>
                <Route
                    path="/about"
                    element={
                        <Navbar>
                            <About />
                        </Navbar>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
