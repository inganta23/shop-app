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
            {!loading && !isHome && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />}>
                    <Route path=":productId" element={<Product />} />
                </Route>
                <Route path="/mystore" element={<MyStore />}>
                    <Route path=":productId" element={<Product isMyStore={true} />} />
                </Route>
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    );
}

export default App;
