import React from 'react'

import Sidenav from "./Sidenav";
import DropdownProfile from "./DropdownProfile";
import Loading from "./Loading";

const Navbar = () => (
    <div>
        <nav className="grey darken-3">
            <Sidenav/>
            <DropdownProfile/>
        </nav>
        <Loading/>
    </div>
)

export default Navbar