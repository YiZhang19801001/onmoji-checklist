import { dailyTasks, weeklyTasks, otherTasks } from '../data/tasks-seed';
import { Task } from '../Model/Task';

function mapTasks(jsonString: string): Task[] {
  const tasks: Task[] = JSON.parse(jsonString);

  return tasks.map((task) => {
    const now = new Date();
    if (dailyTasks.some((t) => t.name === task.name)) {
      const dailyTaskResetTime = now.setHours(task.resetTime || 3, 0, 0);

      if (dailyTaskResetTime < (task.lastUpdatedTime || 0) && !task.duration)
        return task;

      if (task.duration) {
        const lastUpdateDate = task.lastUpdatedTime
          ? new Date(task.lastUpdatedTime)
          : now;

        const hour = lastUpdateDate.getHours();

        return {
          ...task,
          isCompleted: false,
          startTime: lastUpdateDate.setHours(hour + task.duration / 60),
        };
      }

      // reset the task;
      return {
        ...task,
        isCompleted: false,
        lastUpdatedTime: now.getTime(),
        startTime: dailyTaskResetTime,
      };
    }

    if (weeklyTasks.some((t) => t.name === task.name)) {
      const day = now.getDay() || 7; // Get current day number, converting Sun. to 7
      // Only manipulate the date if it isn't Mon.
      const monday =
        day !== 1 ? now.setHours(-24 * (day - 1)) : now.setHours(3, 0, 0); // Set the hours to day number minus 1

      if (monday < (task.lastUpdatedTime || 0)) return task;
      // reset the task;
      return {
        ...task,
        isCompleted: false,
        lastUpdatedTime: now.getTime(),
        startTime: monday,
      };
    }

    if (otherTasks.some((t) => t.name === task.name)) {
      return task;
    }

    return task;
  });
}

export default mapTasks;
