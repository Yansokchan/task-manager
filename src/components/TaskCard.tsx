import React, { useState } from "react";
import {
  Calendar,
  Edit,
  Trash2,
  Clock,
  Pin,
  Check,
  Plus,
  Heading1,
  Eye,
} from "lucide-react";
import { Task, Step } from "../types/Task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onView: (task: Task) => void;
}

const TaskCard = ({ task, onEdit, onDelete, onPin, onView }: TaskCardProps) => {
  const [isStepsExpanded, setIsStepsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    }
  };

  const toggleStep = (stepId: string) => {
    const updatedSteps = task.steps?.map((step) =>
      step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step
    );
    onEdit({ ...task, steps: updatedSteps });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-950 border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
          {task.title}
        </h3>
        <div className="flex items-center space-x-2">
          {/* Pin Button */}
          {task.isPinned && (
            <button
              onClick={(e) => {
                onPin(task.id);
              }}
              className="p-2 text-blue-600 dark:text-blue-500 hover:translate-y-[-2px] rounded-lg transition-all duration-200"
            >
              <Pin
                className={`h-4 w-4 ${task.isPinned ? "fill-current" : ""}`}
              />
            </button>
          )}

          <button
            onClick={(e) => {
              onView(task);
            }}
            className="p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            onClick={(e) => {
              onEdit(task);
            }}
            className="p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              onDelete(task.id);
            }}
            className="p-2 text-gray-400 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Steps Section */}
      {task.steps && task.steps.length > 0 ? (
        <div className="mb-4">
          <button
            onClick={(e) => {
              setIsStepsExpanded(!isStepsExpanded);
            }}
            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-2"
          >
            <span className="mr-2">
              {task.steps.filter((step) => step.isCompleted).length} /{" "}
              {task.steps.length} steps completed
            </span>
          </button>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          No steps yet.
        </p>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              task.status
            )}`}
          >
            {task.status.replace("-", " ")}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3 mr-1" />
          {new Date(task.date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
