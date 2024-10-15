import Header from "./Header"

function HeaderOnly({children}) {
    console.log(children);
    
    return (
        <div>
            <Header />
            <div className="container">
                <div  className="w-full p-5 m-5 bg-white rounded-xl shadow-lg border-[1px] border-[var(--primary)]">{children}</div>
            </div>
        </div>
    )
}

export default HeaderOnly