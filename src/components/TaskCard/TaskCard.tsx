import React, { useEffect, useState, useRef } from 'react';
import { Task } from '../../Model/Task';

enum TaskType {
  action = 1,
  await = 2,
  done = 3,
}

type Props = {
  task: Task;
  toggleTask: React.ChangeEventHandler<HTMLInputElement>;
  type: TaskType;
};

function TaskCard({ task, toggleTask, type }: Props) {
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

  return (
    <li key={task.name}>
      <div>
        <input
          id={task.name}
          type="checkbox"
          onChange={toggleTask}
          checked={task.isCompleted || false}
        />
        <label htmlFor={task.name}>
          {task.name} {timeTo}
        </label>
      </div>
    </li>
  );
}

export default TaskCard;
