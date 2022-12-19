import { useState } from 'react';
import TaskCard from './components/TaskCard/TaskCard';
import { Task } from './Model/Task';
import useTasks from './hooks/useTasks';
import useUser from './hooks/useUser';

import './App.css';

function App() {
  const [isCompletedTasksVisible, setIsCompletedTasksVisible] = useState(false);
  const [isUpcomingTasksVisible, setIsUpcomingTasksVisible] = useState(false);
  const { selectedUser, users, selectUserById } = useUser();
  const { tasks, toggleTask, flushTasks, postponeTask } = useTasks(selectedUser.id);

  // todo:: hide some unnecessary tasks from the list.
  const hideTheTask = () => {};
  const flushAllTasks = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    users.forEach((user) => flushTasks(user.id));
  };

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

  const handleUserSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    selectUserById(event.target.value);
  };

  const d = new Date();
  const now = d.getTime();

  const completedTasks = tasks.filter((task) => task.isCompleted);
  const uncompletedTasksCanStart = tasks.filter(
    (task) => !task.isCompleted && task.startTime < now && !task.postpone
  );
  const uncompletedTasksCannotStart = tasks
    .filter((task) => !task.isCompleted && task.startTime > now && !task.postpone)
    .sort((a, b) => a.startTime - b.startTime);

  return (
    <div className="root">
      <header>
        <button onClick={flushAllTasks}>
          Updated DB structure
        </button>

        <button onClick={toggleCompletedTasks}>
          {isCompletedTasksVisible
            ? 'Hide Completed Tasks'
            : 'Show Completed Tasks'}
        </button>

        <button onClick={toggleUpcomingTasks}>
          {isUpcomingTasksVisible
            ? 'Hide Upcoming Tasks'
            : 'Show Upcoming Tasks'}
        </button>

        <select
          title="user-select"
          name="user-select"
          value={selectedUser.id}
          onChange={handleUserSelectOnChange}
        >
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </header>
      {/* Tasks can start now */}
      {uncompletedTasksCanStart.length > 0 && (
        <ul>
          {uncompletedTasksCanStart.map((task: Task) => (
            <TaskCard
              key={task.name}
              task={task}
              toggleTask={toggleTask}
              postponeTask={postponeTask}
              type={1}
            />
          ))}
        </ul>
      )}
      {uncompletedTasksCanStart.length <= 0 &&
        !isUpcomingTasksVisible &&
        !isCompletedTasksVisible && (
          <div className="completed-message">
            任务已经完成，可以开始刷副本了。 今天还有
            {uncompletedTasksCannotStart.length}个任务待完成。
          </div>
        )}
      {/* Tasks need start later */}
      {isUpcomingTasksVisible && (
        <ul>
          {uncompletedTasksCannotStart.map((task: Task) => (
            <TaskCard
              key={task.name}
              task={task}
              toggleTask={toggleTask}
              postponeTask={postponeTask}
              type={2}
            />
          ))}
        </ul>
      )}
      {/* Tasks which are completed */}
      {isCompletedTasksVisible && (
        <ul>
          {completedTasks.map((task) => (
            <TaskCard
              key={task.name}
              task={task}
              toggleTask={toggleTask}
              postponeTask={postponeTask}
              type={3}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
