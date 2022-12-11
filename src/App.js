import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import NotFound from './Pages/NotFound';
import './scss/app.scss';
import { setSearchValue } from './redux/slices/filterSlice';

// export const SearchContext = React.createContext('');

function App() {
  // const [searchValue, setSearchValue] = useState('');
  // console.log(searchValue);

  return (
    <div className="wrapper">
      {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      {/* </SearchContext.Provider> */}
    </div>
  );
}

export default App;
