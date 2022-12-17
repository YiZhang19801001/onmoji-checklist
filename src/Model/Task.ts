export type Task = {
  name: string;
  isCompleted: boolean;
  lastUpdatedTime?: number;
  startTime: number;
  resetTime?: number;
  duration?: number;
};
