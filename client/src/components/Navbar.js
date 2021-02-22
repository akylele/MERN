import React from 'react'

import Sidenav from "./Sidenav";
import DropdownProfile from "./DropdownProfile";

const Navbar = () => (
    <div>
        <nav className="grey darken-3">
            <Sidenav/>
            <DropdownProfile/>
        </nav>
    </div>
)

export default Navbar