import { Layout } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "components/Header";
// import Footer from "components/Footer";
import Login from "pages/Login";
import routes from "./navigations";

const RouteComponent = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Layout className="mapo-content">
          <Header />
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  path={route.path}
                  key={route.path}
                  element={route.component}
                  {...route}
                />
              );
            })}
            <Route key="1" from="*" to="/" />
          </Routes>
          {/* <Footer /> */}
        </Layout>
      ) : (
        <Routes>
          <Route exact path="*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default RouteComponent;
