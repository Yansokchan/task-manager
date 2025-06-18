import React, { useState } from "react";
import Layout from "../components/Layout";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import ProgressDashboard from "../components/ProgressDashboard";
import { Task } from "../types/Task";
import { useToast } from "../hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

// Dummy data for demonstration
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design Dashboard UI",
    description:
      "Create a modern and responsive dashboard interface with dark mode support",
    status: "in-progress",
    priority: "high",
    date: "2024-06-10",
    createdAt: "2024-06-05T10:00:00Z",
  },
  {
    id: "2",
    title: "Implement Authentication",
    description: "Set up user login and registration with JWT tokens",
    status: "completed",
    priority: "high",
    date: "2024-06-08",
    createdAt: "2024-06-04T14:30:00Z",
  },
  {
    id: "3",
    title: "Write API Documentation",
    description:
      "Document all REST endpoints with examples and response formats",
    status: "pending",
    priority: "medium",
    date: "2024-06-15",
    createdAt: "2024-06-05T09:15:00Z",
  },
  {
    id: "4",
    title: "Setup Testing Environment",
    description:
      "Configure Jest and React Testing Library for unit and integration tests",
    status: "pending",
    priority: "low",
    date: "2024-06-20",
    createdAt: "2024-06-05T16:45:00Z",
  },
  {
    id: "5",
    title: "Mobile Responsive Design",
    description: "Ensure all components work perfectly on mobile devices",
    status: "in-progress",
    priority: "medium",
    date: "2024-06-12",
    createdAt: "2024-06-03T11:20:00Z",
  },
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const { toast } = useToast();

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? ({
                ...taskData,
                id: editingTask.id,
                createdAt: editingTask.createdAt,
              } as Task)
            : task
        )
      );
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
        variant: "success",
      });
    } else {
      // Create new task
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      } as Task;
      setTasks([newTask, ...tasks]);
      toast({
        title: "Task created",
        description: "Your new task has been created successfully.",
        variant: "success",
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
      toast({
        title: "Task deleted",
        description: "The task has been deleted successfully.",
        variant: "destructive",
      });
    }
  };

  const handlePinTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isPinned: !task.isPinned } : task
      )
    );
    toast({
      title: "Task pinned",
      description: "The task pin status has been updated.",
      variant: "default",
    });
  };

  return (
    <Layout
      onAddTask={handleAddTask}
      viewMode={viewMode}
      setViewMode={setViewMode}
    >
      <div className="space-y-6">
        {/* Progress Dashboard */}
        <ProgressDashboard tasks={tasks} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onPinTask={handlePinTask}
          viewMode={viewMode}
        />
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </Layout>
  );
};

export default Index;
