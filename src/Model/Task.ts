export type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
  lastUpdatedTime?: number;
  startTime: number;
  resetTime?: number;
  duration?: number;
};
