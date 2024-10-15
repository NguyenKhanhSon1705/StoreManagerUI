import { Fragment, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { privateRoute, privateRouteSideBar, publicRoute } from "./routes";
import LayoutDefault from "./layouts/LayoutDefault";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/actions/currentUserAction";
import Cookies from "js-cookie";

export default function App() {
  const loginedCookie = Cookies.get(process.env.REACT_APP_LOGINED) === "true";
  const idShop = localStorage.getItem(process.env.REACT_APP_IDSHOP);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loginedCookie && idShop && dispatch(getCurrentUser(+atob(idShop)));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, loginedCookie , idShop]);


  return (
    <Router>
      {
        <div className="h-full w-full">
          <Routes>
            {/* các routes không cần đăng nhập vẫn có thể truy cập */}
            {publicRoute.map((route, index) => {
              let Layout = LayoutDefault
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              const Page = route.component
              return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} ></Route>
            })}

            {/* Các routes phải đăng nhập thuộc về phần thanh sidebar */}
            {privateRouteSideBar.map((route, index) => {
              let Layout = LayoutDefault
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }
              const Page = route.component
              return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} ></Route>
            })}

            {/* các routes khác cần phải đăng nhập other */}
            {privateRoute.map((route, index) => {

              let Layout = LayoutDefault
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }
              const Page = route.component
              return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} ></Route>
            })}

          </Routes>
        </div>
      }
    </Router>
  )
}