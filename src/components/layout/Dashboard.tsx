
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} language={language} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen} 
          language={language}
          toggleLanguage={toggleLanguage}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
