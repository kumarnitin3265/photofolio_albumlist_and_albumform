import navStyle from "./Navbar.module.css";


function Navbar() {
    return (
        <>
            <div className={navStyle.nav}>
                <div className={navStyle.logo}>
                    {/* <Link to="/"> */}
                        <img src="https://mellow-seahorse-fc9268.netlify.app/assets/logo.png"/>
                        <span>PhotoFolio</span>
                    {/* </Link> */}
                </div>
            </div>
        </>
    )
}

export default Navbar;