import { Fragment } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoute } from "./routes";
import LayoutDefault from "./layouts/LayoutDefault";

export default function App() {
  return (
    <Router>
      {
        <div className="h-full w-full">
          
            <Routes>
              {publicRoute.map((route , index)=>{
                let Layout = LayoutDefault
                if(route.layout){
                  Layout = route.layout
                }else if(route.layout === null){
                  Layout = Fragment
                }
                const Page = route.component
                  return <Route key={index} path={route.path} element={<Layout><Page/></Layout>} ></Route>
              })}
            </Routes>
        </div>
        // publicRoute.map
      }

    </Router>
  )
}