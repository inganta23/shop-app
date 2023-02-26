import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import Home from './pages/Home';
import Main from './pages/Main';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />}>
                    <Route path=":productId" element={<Product />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
