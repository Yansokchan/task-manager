
import React, { useState } from 'react';
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import { Task } from '../types/Task';
import { useToast } from '../hooks/use-toast';

// Dummy data for demonstration
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design Dashboard UI',
    description: 'Create a modern and responsive dashboard interface with dark mode support',
    status: 'in-progress',
    priority: 'high',
    date: '2024-06-10',
    createdAt: '2024-06-05T10:00:00Z',
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up user login and registration with JWT tokens',
    status: 'completed',
    priority: 'high',
    date: '2024-06-08',
    createdAt: '2024-06-04T14:30:00Z',
  },
  {
    id: '3',
    title: 'Write API Documentation',
    description: 'Document all REST endpoints with examples and response formats',
    status: 'pending',
    priority: 'medium',
    date: '2024-06-15',
    createdAt: '2024-06-05T09:15:00Z',
  },
  {
    id: '4',
    title: 'Setup Testing Environment',
    description: 'Configure Jest and React Testing Library for unit and integration tests',
    status: 'pending',
    priority: 'low',
    date: '2024-06-20',
    createdAt: '2024-06-05T16:45:00Z',
  },
  {
    id: '5',
    title: 'Mobile Responsive Design',
    description: 'Ensure all components work perfectly on mobile devices',
    status: 'in-progress',
    priority: 'medium',
    date: '2024-06-12',
    createdAt: '2024-06-03T11:20:00Z',
  },
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...taskData, id: editingTask.id, createdAt: editingTask.createdAt }
          : task
      ));
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
    } else {
      // Create new task
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
      toast({
        title: "Task created",
        description: "Your new task has been created successfully.",
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: "Task deleted",
        description: "The task has been deleted successfully.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout onAddTask={handleAddTask}>
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
            <div className="text-sm text-gray-500">Total Tasks</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-500">In Progress</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-orange-600">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
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
