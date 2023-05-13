import { useContext, useEffect, useState } from 'react';
import { Navbar } from './components/navbar/navbar';
import { Spinner, SpinnerSize, initializeIcons } from '@fluentui/react';
import { mainContainerClassname, spinnerClassname } from './App.styles';
import { SearchProducts } from './components/searchProducts/serachProducts';
import { ProductPage } from './components/productPage/productPage';
import { Route, Routes } from 'react-router-dom';
import { ManageProducts } from './components/manageProducts/manageProducts';
import { ManageShoppingCart } from './components/manageShoppingCart/manageShoppingCart';
import { ManageStock } from './components/manageStock/manageStock';
import { ManageMemberships } from './components/manageMemberships/manageMemberships';
import { ServiceContext, ServiceContextInstance } from './core/serviceContext';
import { AuthentificationContextModel } from './authentication/authenticationContext.types';
import AuthentificationContext from './authentication/authenticationContext';
import { ManageProfile } from './components/manageProfile/manageProfile';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
initializeIcons();

function App() {
  const services = useContext<ServiceContext>(ServiceContextInstance);
  const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);

  useEffect(() => {
    services.UserService.GetUserInfo("58723584-ADFD-4B97-81DB-017104970B93").then(user => { authenticationContext.SetUpdatedUser(user); });
  }, []);

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsUserLoaded(authenticationContext.User.userGUID !== '00000000-0000-0000-0000-000000000000');
    }, 800);
  }, [authenticationContext.User]);

  //const isUserInfoLoaded = authenticationContext.User.userGUID !== '00000000-0000-0000-0000-000000000000';

  return (
    <>
      <Routes>
        {true && <>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />

        </>

        }
      </Routes>
      {false && !isUserLoaded &&
        <div style={{ width: '100vw', height: '50vh' }}>
          <Spinner label="Loading data..." ariaLive="assertive" labelPosition="top" className={spinnerClassname} size={SpinnerSize.large} />
        </div>
      }
      {false && isUserLoaded &&
        <div className="App">
          {/* <Login /> */}
          <Navbar />
          <div className={mainContainerClassname}>
            {/* <ManageProducts/> */}
            <Routes>
              <Route
                path="/manageProducts/:category"
                element={<ManageProducts />}
              />

              <Route
                path="/searchProducts/:keywords?"
                element={<SearchProducts />}
              />

              <Route
                path="/productPage/:uid"
                element={<ProductPage />}
              />

              <Route
                path="/manageShoppingCart"
                element={<ManageShoppingCart />}
              />

              <Route
                path="/myStock"
                element={<ManageStock />}
              />

              <Route
                path="/manageMemberships"
                element={<ManageMemberships />}
              />

              <Route
                path="/manageProfile"
                element={<ManageProfile />}
              />
            </Routes>
          </div>
        </div>}
    </>
  );
}

export default App;
