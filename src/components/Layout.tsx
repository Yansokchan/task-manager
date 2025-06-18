import React, { useState } from "react";
import { Plus, Home, List, Menu, User, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: React.ReactNode;
  onAddTask: () => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
}

const Layout = ({
  children,
  onAddTask,
  viewMode,
  setViewMode,
}: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", icon: Home, current: true },
    { name: "Tasks", icon: List, current: false },
    { name: "Profile", icon: User, current: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`
          bg-white dark:bg-gray-900 w-64
          transition-transform duration-300 ease-in-out
          fixed inset-y-0 left-0 z-50
          border-r-2 border-gray-200 dark:border-gray-800
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:translate-x-0 lg:z-30
        `}
      >
        <div className="flex flex-col h-full justify-start">
          <div className="flex items-center justify-between h-16 px-4 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Task Management
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* Theme toggle as menu item */}
          <div className="px-2 pl-3 py-3 border-b border-t-2 border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Theme
            </span>
            <ThemeToggle />
          </div>
          {/* View mode menu with sliding animation */}
          <div className="px-2 pl-3 py-3 border-b border-gray-200 dark:border-gray-800">
            <div className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              View Mode
            </div>
            <div className="relative flex flex-col gap-1 h-24 w-full">
              {/* Sliding indicator */}
              <div
                className="absolute left-0 w-full h-10 rounded-md bg-blue-100 dark:bg-blue-900 transition-all duration-300 z-0"
                style={{
                  top: viewMode === "grid" ? 0 : 44,
                  boxShadow:
                    viewMode === "grid" || viewMode === "table"
                      ? "0 2px 8px 0 rgba(37, 99, 235, 0.08)"
                      : undefined,
                  transition: "top 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`relative flex items-center w-full h-10 px-2 py-2 rounded-md text-sm font-medium transition-colors z-10
                  ${
                    viewMode === "grid"
                      ? "text-blue-800 dark:text-blue-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }
                `}
                aria-pressed={viewMode === "grid"}
              >
                <span className="flex-1 text-left">Card</span>
                {viewMode === "grid" && (
                  <span className="ml-2 text-blue-600 dark:text-blue-300">
                    ✓
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`relative flex items-center w-full h-10 px-2 py-2 rounded-md text-sm font-medium transition-colors z-10
                  ${
                    viewMode === "table"
                      ? "text-blue-800 dark:text-blue-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }
                `}
                aria-pressed={viewMode === "table"}
              >
                <span className="flex-1 text-left">Table</span>
                {viewMode === "table" && (
                  <span className="ml-2 text-blue-600 dark:text-blue-300">
                    ✓
                  </span>
                )}
              </button>
            </div>
          </div>
          {/* <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav> */}
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 lg:hidden">
                Task Management
              </h2>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hidden lg:block">
                Management Dashboard
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onAddTask}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-800 text-white text-sm font-medium rounded-lg hover:from-blue-500 hover:to-blue-900 transition-colors shadow-sm"
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

      {/* Overlay for mobile only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
