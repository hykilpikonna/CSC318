// NavBar.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavItem } from '../components/NavItem'; // adjust the path as needed

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState(location.pathname);

    useEffect(() => {
        navigate(selected);
    }, [selected]);

    const handleItemClick = (path: any) => {
        setSelected(path);
    }

    const navItems = [
        { icon: "mdi:book", label: "Courses", path: "/courses" },
        { icon: "mdi:earth", label: "Collab Learning", path: "/collab-learning" },
        { icon: "mdi:clipboard-text-clock", label: "Review", path: "/review" },
        { icon: "mdi:microphone-message", label: "Speaking", path: "/speaking" },
        { icon: "mdi:account", label: "Profile", path: "/profile" },
    ];

    return (
        <nav className='navbar' >
            {navItems.map(item => (
                <NavItem 
                    key={item.path}
                    icon={item.icon} 
                    label={item.label} 
                    path={item.path} 
                    selected={selected} 
                    handleItemClick={handleItemClick} 
                />
            ))}
        </nav>
    )
}