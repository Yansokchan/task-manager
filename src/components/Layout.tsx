import React, { useState } from "react";
import { Plus, Home, List, Settings as SettingsIcon, User } from "lucide-react";
import Settings from "./Settings";

interface LayoutProps {
  children: React.ReactNode;
  onAddTask: () => void;
}

const Layout = ({ children, onAddTask }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", icon: Home, current: true },
    { name: "Tasks", icon: List, current: false },
    { name: "Profile", icon: User, current: false },
    { name: "Settings", icon: SettingsIcon, current: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Removed Sidebar */}
      {/* Main content */}
      <div className="lg:pl-0">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm border-b-2 border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Task Management
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <Settings />
              <button
                onClick={onAddTask}
                className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </button>
            </div>
          </div>
        </div>
        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
