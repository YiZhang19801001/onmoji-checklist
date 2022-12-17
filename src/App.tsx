import { useState } from 'react';
import TaskCard from './components/TaskCard/TaskCard';
import { Task } from './Model/Task';
import useTasks from './hooks/useTasks';
import useUser from './hooks/useUser';

function App() {
  const [isCompletedTasksVisible, setIsCompletedTasksVisible] = useState(false);
  const [isUpcomingTasksVisible, setIsUpcomingTasksVisible] = useState(false);
  const { selectedUser, users, selectUserById } = useUser();
  const { tasks, toggleTask } = useTasks(selectedUser.id);

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

  const handleUserSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    selectUserById(event.target.value);
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
      <button onClick={toggleCompletedTasks}>
        {isCompletedTasksVisible
          ? 'Hide Completed Tasks'
          : 'Show Completed Tasks'}
      </button>

      <button onClick={toggleUpcomingTasks}>
        {isUpcomingTasksVisible ? 'Hide Upcoming Tasks' : 'Show Upcoming Tasks'}
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
      {/* Tasks can start now */}
      {uncompletedTasksCanStart.length > 0 ? (
        <ul>
          {uncompletedTasksCanStart.map((task: Task) => (
            <TaskCard
              key={task.name}
              task={task}
              toggleTask={toggleTask}
              type={1}
            />
          ))}
        </ul>
      ) : (
        'No more tasks'
      )}
      {/* Tasks need start later */}
      {isUpcomingTasksVisible && (
        <ul>
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
        <ul>
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
