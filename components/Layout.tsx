
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userRole }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line', roles: [UserRole.ADMIN, UserRole.HR, UserRole.ACCOUNTS, UserRole.MANAGER, UserRole.EMPLOYEE] },
    { id: 'employees', label: 'Employees', icon: 'fa-users', roles: [UserRole.ADMIN, UserRole.HR] },
    { id: 'attendance', label: 'Attendance', icon: 'fa-calendar-check', roles: [UserRole.ADMIN, UserRole.HR, UserRole.MANAGER, UserRole.EMPLOYEE] },
    { id: 'leave', label: 'Leave Management', icon: 'fa-envelope-open-text', roles: [UserRole.ADMIN, UserRole.HR, UserRole.MANAGER, UserRole.EMPLOYEE] },
    { id: 'payroll', label: 'Payroll', icon: 'fa-money-check-dollar', roles: [UserRole.ADMIN, UserRole.ACCOUNTS] },
    { id: 'advances', label: 'Advances & Loans', icon: 'fa-hand-holding-dollar', roles: [UserRole.ADMIN, UserRole.ACCOUNTS] },
    { id: 'reports', label: 'Reports', icon: 'fa-file-invoice', roles: [UserRole.ADMIN, UserRole.HR, UserRole.ACCOUNTS] },
    { id: 'settings', label: 'Settings', icon: 'fa-cog', roles: [UserRole.ADMIN] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-white font-bold text-xl tracking-tight">PaySmart<span className="text-blue-500">BD</span></h1>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white">
            <i className={`fas ${isSidebarOpen ? 'fa-angle-left' : 'fa-bars'}`}></i>
          </button>
        </div>
        
        <nav className="flex-1 mt-4 px-3 space-y-1">
          {filteredMenu.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fas ${item.icon} w-6 text-center`}></i>
              {isSidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {userRole[0]}
            </div>
            {isSidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">System {userRole}</p>
                <p className="text-xs text-slate-400">Authenticated</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">Pages</span>
            <span className="text-slate-400 text-sm">/</span>
            <span className="text-slate-900 text-sm font-medium capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <i className="fas fa-bell text-slate-400 cursor-pointer hover:text-blue-500 transition-colors"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
              <span className="text-sm font-medium">Logout</span>
              <i className="fas fa-sign-out-alt text-sm"></i>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
