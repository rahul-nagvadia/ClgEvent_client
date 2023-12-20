import React from 'react';
import OrganizerNavbar from './ClgNavbar';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div>


            <OrganizerNavbar />
            {children}

        </div>
    );
}

export default Layout;
