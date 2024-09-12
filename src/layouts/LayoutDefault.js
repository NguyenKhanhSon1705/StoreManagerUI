import Header from "./Header";
import Sidebar from "./Sidebar";

function LayoutDefault({children}) {
    
    return ( 
        <div className="h-full w-full">
            <Header></Header>
            <div className="flex">
                <Sidebar ></Sidebar>
                <div className="w-full p-5 m-5 bg-white rounded-xl shadow-lg border-[1px] border-[var(--primary)]">
                    {children}
                </div>
            </div>
        </div>
     );
}

export default LayoutDefault;