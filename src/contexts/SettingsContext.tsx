import React, { createContext, useContext, useEffect, useState } from "react";

interface SettingsContextType {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  defaultSort: "dueDate" | "priority" | "status";
  setDefaultSort: (sort: "dueDate" | "priority" | "status") => void;
  notifications: boolean;
  setNotifications: (enabled: boolean) => void;
  emailNotifications: boolean;
  setEmailNotifications: (enabled: boolean) => void;
  showCompletedTasks: boolean;
  setShowCompletedTasks: (show: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    const saved = localStorage.getItem("viewMode") as "grid" | "list";
    return saved || "grid";
  });

  const [defaultSort, setDefaultSort] = useState<
    "dueDate" | "priority" | "status"
  >(() => {
    const saved = localStorage.getItem("defaultSort") as
      | "dueDate"
      | "priority"
      | "status";
    return saved || "dueDate";
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : true;
  });

  const [emailNotifications, setEmailNotifications] = useState(() => {
    const saved = localStorage.getItem("emailNotifications");
    return saved ? JSON.parse(saved) : false;
  });

  const [showCompletedTasks, setShowCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("showCompletedTasks");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem("defaultSort", defaultSort);
  }, [defaultSort]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "emailNotifications",
      JSON.stringify(emailNotifications)
    );
  }, [emailNotifications]);

  useEffect(() => {
    localStorage.setItem(
      "showCompletedTasks",
      JSON.stringify(showCompletedTasks)
    );
  }, [showCompletedTasks]);

  return (
    <SettingsContext.Provider
      value={{
        viewMode,
        setViewMode,
        defaultSort,
        setDefaultSort,
        notifications,
        setNotifications,
        emailNotifications,
        setEmailNotifications,
        showCompletedTasks,
        setShowCompletedTasks,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
