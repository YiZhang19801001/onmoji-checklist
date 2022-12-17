import { useEffect, useState } from 'react';
import TaskCard from './components/TaskCard/TaskCard';
import { dailyTasks, weeklyTasks, otherTasks } from './data/tasks';
import mapTasks from './helpers/mapTasks';
import { Task } from './Model/Task';

const localStorageKey = 'onmyoji-checklist';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCompletedTasksVisible, setIsCompletedTasksVisible] = useState(false);
  const [isUpcomingTasksVisible, setIsUpcomingTasksVisible] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(localStorageKey);
    if (!data) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify([...dailyTasks, ...weeklyTasks, ...otherTasks])
      );
    } else {
      setTasks(mapTasks(data));
    }
  }, []);

  const toggleTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const now = new Date();
    const updatedTasks = tasks.map((task) => {
      if (task.name !== event.target.id) return task;
      return { ...task, isCompleted: event.target.checked };
    });
    setTasks(updatedTasks);

    localStorage.setItem(
      localStorageKey,
      JSON.stringify(
        updatedTasks.map((task) => ({
          ...task,
          lastUpdatedTime: now.getTime(),
        }))
      )
    );
  };

  // todo:: hide some unnecessary tasks from the list.
  const hideTheTask = () => {};

  const toggleCompletedTasks = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsCompletedTasksVisible(!isCompletedTasksVisible);
  };

  const toggleUpcomingTasks = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsUpcomingTasksVisible(!isUpcomingTasksVisible);
  };

  const d = new Date();
  const now = d.getTime();

  const completedTasks = tasks.filter((task) => task.isCompleted);
  const uncompletedTasksCanStart = tasks.filter(
    (task) => !task.isCompleted && task.startTime < now
  );
  const uncompletedTasksCannotStart = tasks
    .filter((task) => !task.isCompleted && task.startTime > now)
    .sort((a, b) => a.startTime - b.startTime);

  return (
    <>
      <button onClick={toggleCompletedTasks} className="mx-2">
        {isCompletedTasksVisible
          ? 'Hide Completed Tasks'
          : 'Show Completed Tasks'}
      </button>

      <button onClick={toggleUpcomingTasks} className="mx-2">
        {isUpcomingTasksVisible ? 'Hide Upcoming Tasks' : 'Show Upcoming Tasks'}
      </button>
      {/* Tasks can start now */}
      <ul className="divide-y divide-gray-200">
        {uncompletedTasksCanStart.map((task: Task) => (
          <TaskCard
            key={task.name}
            task={task}
            toggleTask={toggleTask}
            type={1}
          />
        ))}
      </ul>
      {/* Tasks need start later */}
      {isUpcomingTasksVisible && (
        <ul className="divide-y divide-gray-200">
          {uncompletedTasksCannotStart.map((task: Task) => (
            <TaskCard
              key={task.name}
              task={task}
              toggleTask={toggleTask}
              type={2}
            />
          ))}
        </ul>
      )}
      {/* Tasks which are completed */}
      {isCompletedTasksVisible && (
        <ul className="divide-y divide-gray-200">
          {completedTasks.map((task) => (
            <TaskCard
              key={task.name}
              task={task}
              toggleTask={toggleTask}
              type={3}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
