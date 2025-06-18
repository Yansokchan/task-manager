export interface Step {
  id: string;
  description: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  date: string;
  createdAt: string;
  isPinned?: boolean;
  steps?: Step[];
}
