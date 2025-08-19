import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationRail } from './navigation-rail';
import { LeftSidebar } from './left-sidebar';
import { MainContent } from './main-content';
import { RightSidebar } from './right-sidebar';

export interface SidebarStates {
  left: boolean;
  right: boolean;
  navExpanded: boolean;
}

interface DashboardLayoutProps {
  currentView?: string;
  children?: React.ReactNode;
  selectedCategory?: string;
}

export function DashboardLayout({ currentView, children, selectedCategory }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarStates, setSidebarStates] = useState<SidebarStates>({
    left: true,
    right: false,
    navExpanded: false,
  });
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [originalRightState, setOriginalRightState] = useState(false);
  
  // Determine the current category based on route
  const getCurrentCategory = () => {
    if (location.pathname.startsWith('/hotel')) {
      return 'travel'; // Hotel management is part of Travel category
    }
    return selectedCategory || 'travel';
  };
  
  const [currentCategory, setCurrentCategory] = useState(getCurrentCategory());

  const toggleSidebar = (side: 'left' | 'right') => {
    setSidebarStates(prev => {
      const newState = !prev[side];
      
      // Auto-hide logic: when opening one sidebar, close the other
      if (newState) {
        if (side === 'left') {
          if (!isNavHovered) {
            setOriginalRightState(false);
          }
          return {
            ...prev,
            left: true,
            right: false
          };
        } else if (side === 'right') {
          if (!isNavHovered) {
            setOriginalRightState(true);
          }
          return {
            ...prev,
            left: false,
            right: true
          };
        }
      }
      
      if (side === 'right' && !isNavHovered) {
        setOriginalRightState(newState);
      }
      
      return {
        ...prev,
        [side]: newState
      };
    });
  };

  const toggleNavExpanded = () => {
    setSidebarStates(prev => ({
      ...prev,
      navExpanded: !prev.navExpanded
    }));
  };

  const handleNavHover = (isHovered: boolean) => {
    setIsNavHovered(isHovered);
    
    if (isHovered) {
      setOriginalRightState(sidebarStates.right);
      setSidebarStates(prev => ({
        ...prev,
        right: false
      }));
    } else {
      setTimeout(() => {
        setSidebarStates(prev => ({
          ...prev,
          right: originalRightState
        }));
      }, 100);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-cyan-500/5 dark:to-cyan-500/10 text-foreground overflow-hidden gap-px">
      {/* Navigation Rail */}
      <NavigationRail
        isExpanded={sidebarStates.navExpanded}
        onToggleExpanded={toggleNavExpanded}
        onHover={handleNavHover}
        selectedCategory={currentCategory}
        onCategoryClick={setCurrentCategory}
      />

      {/* Left Sidebar */}
      <LeftSidebar
        currentView={currentView}
        isCollapsed={!sidebarStates.left}
      />

      {/* Main Content */}
      <MainContent
        currentView={currentView}
        onToggleSidebar={toggleSidebar}
        isRightSidebarCollapsed={!sidebarStates.right}
        isLeftSidebarCollapsed={!sidebarStates.left}
      >
        {children}
      </MainContent>

      {/* Right Sidebar */}
      <RightSidebar
        currentView={currentView}
        isCollapsed={!sidebarStates.right}
      />
    </div>
  );
}