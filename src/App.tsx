import { useContext, useEffect, useState } from 'react';
import { Navbar } from './components/navbar/navbar';
import { Panel, Spinner, SpinnerSize, initializeIcons } from '@fluentui/react';
import { mainContainerClassname, spinnerClassname } from './App.styles';
import { SearchProducts } from './components/searchProducts/serachProducts';
import { ProductPage } from './components/productPage/productPage';
import { Navigate, NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom';
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
import { HubConnection, HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import { PriceRecommendation } from './components/priceRecommendation/priceRecommendation';
import { Charts } from './charts/charts';

initializeIcons();

function App() {
  const services = useContext<ServiceContext>(ServiceContextInstance);
  const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  const [socketConnection, setSocketConnection] = useState<HubConnection | undefined>();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  useEffect(() => {
    setIsUserAuthenticated(authenticationContext.User.userGUID !== '00000000-0000-0000-0000-000000000000');
    setTimeout(() => {
      setIsUserLoaded(authenticationContext.User.userGUID !== '00000000-0000-0000-0000-000000000000');
    }, 800);
  }, [authenticationContext.User]);

  const onUserAuthenticated = () => {
    setIsUserAuthenticated(true);
    navigate('/manageProducts');
    services.AuthenticationService.GetAuthenticatedUser().then(u => {
      if (u.Data !== undefined && u.Error === undefined)
        authenticationContext.SetUpdatedUser(u.Data);
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    if (authenticationContext.UserIsLoading || !isUserAuthenticated || !isUserLoaded)
      return;

    if (socketConnection || socketConnection != null || socketConnection !== undefined)
      return;

    const connect: HubConnection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7145/notification?key=${authenticationContext.User.userGUID}`)
      .withAutomaticReconnect()
      .build();

    setSocketConnection(connect);
  }, [authenticationContext.UserIsLoading, isUserAuthenticated, isUserLoaded]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection
        .start()
        .then(() => {
          socketConnection.on("Notify", (notification: any) => {
            authenticationContext.FireRefreshNotification();
            notification.open({
              message: "New Notification",
              description: socketConnection,
            });
          });
        })
        .catch((error) => console.log(error));
    }
  }, [socketConnection]);

  return (
    <>
      <Routes>
        {
          authenticationContext.UserIsLoading &&
          <Route
            path="*"
            element={
              <div style={{ width: '100vw', height: '50vh' }}>
                <Spinner label="Loading data..." ariaLive="assertive" labelPosition="top" className={spinnerClassname} size={SpinnerSize.large} />
              </div>}
          />
        }
        {!isUserAuthenticated && !isUserLoaded && !authenticationContext.UserIsLoading &&
          <>
            <Route
              path="/login"
              element={<Login onUserAuthenticated={onUserAuthenticated} />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path='*'
              element={<Navigate to='/login' />}
            />
          </>
        }
      </Routes>
      {isUserAuthenticated && !isUserLoaded &&
        <div style={{ width: '100vw', height: '50vh' }}>
          <Spinner label="Loading data..." ariaLive="assertive" labelPosition="top" className={spinnerClassname} size={SpinnerSize.large} />
        </div>
      }
      {isUserAuthenticated && isUserLoaded &&
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
                path="/priceRecommendation/:uid"
                element={<PriceRecommendation />}
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

              <Route
                path="/charts/:productGUID/:userProductGUID"
                element={<Charts />}
              />

              <Route path='*' element={<Navigate to='/manageProfile' />}
              />
            </Routes>
          </div>
        </div>}
    </>
  );
}

export default App;
