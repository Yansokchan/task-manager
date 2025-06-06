import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { Task } from "../types/Task";
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from "lucide-react";

interface ProgressDashboardProps {
  tasks: Task[];
}

const ProgressDashboard = ({ tasks }: ProgressDashboardProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const statusData = [
    { name: "Completed", value: completedTasks, color: "#22c55e" },
    { name: "In Progress", value: inProgressTasks, color: "#3b82f6" },
    { name: "Pending", value: pendingTasks, color: "#f59e0b" },
  ].filter((item) => item.value > 0);

  const priorityData = [
    {
      name: "High",
      value: tasks.filter((t) => t.priority === "high").length,
      color: "#ef4444",
    },
    {
      name: "Medium",
      value: tasks.filter((t) => t.priority === "medium").length,
      color: "#f59e0b",
    },
    {
      name: "Low",
      value: tasks.filter((t) => t.priority === "low").length,
      color: "#22c55e",
    },
  ].filter((item) => item.value > 0);

  const chartConfig = {
    completed: { label: "Completed", color: "#22c55e" },
    inProgress: { label: "In Progress", color: "#3b82f6" },
    pending: { label: "Pending", color: "#f59e0b" },
    high: { label: "High", color: "#ef4444" },
    medium: { label: "Medium", color: "#f59e0b" },
    low: { label: "Low", color: "#22c55e" },
  };

  // Define gradient ids and colors
  const gradients = {
    completed: {
      id: "completed-gradient",
      from: "#22c55e",
      to: "#16a34a",
    },
    inprogress: {
      id: "inprogress-gradient",
      from: "#3b82f6",
      to: "#1d4ed8",
    },
    pending: {
      id: "pending-gradient",
      from: "#f59e0b",
      to: "#b45309",
    },
    high: {
      id: "high-gradient",
      from: "#ef4444",
      to: "#b91c1c",
    },
    medium: {
      id: "medium-gradient",
      from: "#f59e0b",
      to: "#b45309",
    },
    low: {
      id: "low-gradient",
      from: "#22c55e",
      to: "#16a34a",
    },
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-950 p-6 relative">
        <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400 absolute top-4 right-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Overall Progress
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              Task Completion
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {completedTasks}/{totalTasks} ({Math.round(completionPercentage)}
              %)
            </span>
          </div>
          <Progress
            value={completionPercentage}
            className="h-3"
            indicatorClassName="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-950 p-4 sm:p-6 relative">
          <PieChartIcon className="h-6 w-6 text-purple-600 dark:text-purple-400 absolute top-4 right-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Task Status Distribution
          </h3>
          {statusData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <PieChart>
                <defs>
                  <linearGradient
                    id="completed-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                  <linearGradient
                    id="inprogress-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient
                    id="pending-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => {
                    const key = entry.name.replace(/ /g, "").toLowerCase();
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#${gradients[key]?.id})`}
                      />
                    );
                  })}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No tasks to display
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {statusData.map((item) => {
              const key = item.name.replace(/ /g, "").toLowerCase();
              return (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${gradients[key]?.from}, ${gradients[key]?.to})`,
                    }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item.name}: {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Distribution Bar Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-950 p-4 sm:p-6 relative">
          <BarChart3 className="h-6 w-6 text-orange-500 dark:text-orange-400 absolute top-4 right-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Priority Distribution
          </h3>
          {priorityData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={priorityData}>
                <defs>
                  <linearGradient
                    id="high-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#b91c1c" />
                  </linearGradient>
                  <linearGradient
                    id="medium-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <linearGradient id="low-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  className="text-gray-600 dark:text-gray-300"
                />
                <YAxis className="text-gray-600 dark:text-gray-300" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {priorityData.map((entry, index) => {
                    const key = entry.name.toLowerCase();
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#${gradients[key]?.id})`}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No tasks to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
