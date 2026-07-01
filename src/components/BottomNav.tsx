import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface NavItem {
  icon: string;
  activeIcon: string;
  label: string;
  path: string;
}

interface BottomNavProps {
  role?: 'user' | 'staff';
}

const userNavItems: NavItem[] = [
  { icon: 'solar:home-2-linear', activeIcon: 'solar:home-2-bold', label: 'Beranda', path: '/home' },
  { icon: 'solar:document-text-linear', activeIcon: 'solar:document-text-bold', label: 'Laporan', path: '/reports' },
  { icon: 'solar:add-circle-linear', activeIcon: 'solar:add-circle-bold', label: 'Lapor', path: '/report-form' },
  { icon: 'solar:chat-round-linear', activeIcon: 'solar:chat-round-bold', label: 'Pesan', path: '/messages' },
  { icon: 'solar:user-linear', activeIcon: 'solar:user-bold', label: 'Profil', path: '/profile' },
];

const staffNavItems: NavItem[] = [
  { icon: 'solar:home-2-linear', activeIcon: 'solar:home-2-bold', label: 'Home', path: '/staff' },
  { icon: 'solar:document-text-linear', activeIcon: 'solar:document-text-bold', label: 'Laporan', path: '/staff/reports' },
  { icon: 'solar:graph-new-up-linear', activeIcon: 'solar:graph-new-up-bold', label: 'Dashboard', path: '/staff/dashboard' },
  { icon: 'solar:user-linear', activeIcon: 'solar:user-bold', label: 'Profil', path: '/staff/profile' },
];

export default function BottomNav({ role = 'user' }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const items = role === 'staff' ? staffNavItems : userNavItems;

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.label === 'Lapor' ? (
              <div className="nav-fab">
                <Icon icon={isActive ? item.activeIcon : item.icon} width={26} height={26} />
              </div>
            ) : (
              <>
                <Icon
                  icon={isActive ? item.activeIcon : item.icon}
                  width={22}
                  height={22}
                  className={isActive ? 'nav-icon-active' : 'nav-icon'}
                />
                <span className={`nav-label ${isActive ? 'nav-label-active' : ''}`}>{item.label}</span>
              </>
            )}
          </button>
        );
      })}
    </nav>
  );
}
