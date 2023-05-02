import { useEffect } from 'react';
import { Navbar } from './components/navbar/navbar';
import { initializeIcons } from '@fluentui/react';
import { mainContainerClassname } from './App.styles';
import { SearchProducts } from './components/searchProducts/serachProducts';
import { ProductPage } from './components/productPage/productPage';
import { Route, Routes } from 'react-router-dom';
import { ManageProducts } from './components/manageProducts/manageProducts';
initializeIcons();

function App() {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  });
  return (
    <div className="App">
      {/* <Login /> */}
      <Navbar/>
      <div className={mainContainerClassname}>
        {/* <ManageProducts/> */}
        <Routes>
          <Route
            path="/manageProducts/:category"
            element={<ManageProducts/>}
          />

          <Route
            path="/searchProducts"
            element={<SearchProducts/>}
          />
          
          <Route
            path="/productPage/:uid"
            element={<ProductPage/>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
