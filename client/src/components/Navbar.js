import React from 'react'

import Sidenav from "./Sidenav";
import DropdownProfile from "./DropdownProfile";

const Navbar = () => (
    <div>
        <nav className="white">
            <Sidenav/>
            <DropdownProfile/>
        </nav>
    </div>
)

export default Navbar