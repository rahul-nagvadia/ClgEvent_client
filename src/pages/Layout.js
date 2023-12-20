import React from 'react';
import OrganizerNavbar from './ClgNavbar';
import { useLocation } from 'react-router-dom';

function Layout({ children, orgClgId }) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    
    return (
        <div>
            <OrganizerNavbar orgClgId={orgClgId} />
            {children}
        </div>
    );
}

export default Layout;
