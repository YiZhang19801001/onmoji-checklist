import React, { useEffect, useState, useRef } from 'react';
import { Task } from '../../Model/Task';

import './TaskCard.css';

enum TaskType {
  action = 1,
  await = 2,
  done = 3,
}

type Props = {
  task: Task;
  toggleTask: React.ChangeEventHandler<HTMLInputElement>;
  postponeTask: Function;
  type: TaskType;
};

function TaskCard({ task, toggleTask, type, postponeTask }: Props) {
  const [timeTo, setTimeTo] = useState('');
  const intervalRef = useRef<NodeJS.Timer>();

  const updateTimeTo = () => {
    if (type !== TaskType.await) return;

    const d = new Date();
    const now = d.getTime();
    const { startTime } = task;
    if (now < startTime) {
      // console.log({ startTime, now });
      // update
      const millisecondsToStart = startTime - now;
      const hours = Math.floor(millisecondsToStart / 3600000);
      const minutes = Math.floor((millisecondsToStart % 3600000) / 60000);
      const seconds = Math.floor((millisecondsToStart % 60000) / 1000);
      setTimeTo(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    } else {
      // reload the page, if this task is ready to go
      window.location.reload();
    }
  };

  useEffect(() => {
    if (type === TaskType.await) {
      intervalRef.current = setInterval(updateTimeTo, 1000);
    }

    return () => {
      if (type === TaskType.await) clearInterval(intervalRef.current);
    };
  }, []);

  const handlePostponeTask = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (typeof postponeTask === 'function') postponeTask(task.id);
  };

  return (
    <li key={task.name}>
      <div className="task-card">
        <input
          id={task.name}
          type="checkbox"
          onChange={toggleTask}
          checked={task.isCompleted || false}
        />
        {timeTo && <span className="time-to">{timeTo}</span>}
        <label className="task-name" htmlFor={task.name}>
          {task.name}
        </label>
        {task.showPostpone && (
          <button onClick={handlePostponeTask} className="postpone-button">
            Move to tomorrow
          </button>
        )}
      </div>
    </li>
  );
}

export default TaskCard;
