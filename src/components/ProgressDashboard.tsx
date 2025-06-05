
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Task } from '../types/Task';

interface ProgressDashboardProps {
  tasks: Task[];
}

const ProgressDashboard = ({ tasks }: ProgressDashboardProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const statusData = [
    { name: 'Completed', value: completedTasks, color: '#22c55e' },
    { name: 'In Progress', value: inProgressTasks, color: '#3b82f6' },
    { name: 'Pending', value: pendingTasks, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length, color: '#22c55e' },
  ].filter(item => item.value > 0);

  const chartConfig = {
    completed: { label: 'Completed', color: '#22c55e' },
    inProgress: { label: 'In Progress', color: '#3b82f6' },
    pending: { label: 'Pending', color: '#f59e0b' },
    high: { label: 'High', color: '#ef4444' },
    medium: { label: 'Medium', color: '#f59e0b' },
    low: { label: 'Low', color: '#22c55e' },
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Overall Progress</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Task Completion</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {completedTasks}/{totalTasks} ({Math.round(completionPercentage)}%)
            </span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Status Distribution</h3>
          {statusData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-64">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
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
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution Bar Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Priority Distribution</h3>
          {priorityData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={priorityData}>
                <XAxis 
                  dataKey="name" 
                  className="text-gray-600 dark:text-gray-300"
                />
                <YAxis className="text-gray-600 dark:text-gray-300" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
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
