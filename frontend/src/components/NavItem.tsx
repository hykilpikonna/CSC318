import React from 'react';
import { Icon } from '@iconify/react';

interface NavItemProps {
    icon: string;
    label: string;
    path: string;
    selected: string;
    handleItemClick: (path: string) => void;
}

export const NavItem: React.FC<NavItemProps> = ({ icon, label, path, selected, handleItemClick }) => (
    <div className={`navbar-item ${selected === path ? 'active' : ''}`}
        onClick={() => handleItemClick(path)}>
        <Icon icon={icon} />
        <span>{label}</span>
    </div>
);