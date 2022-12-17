import { useEffect, useState } from 'react';
import { dailyTasks, weeklyTasks, otherTasks } from '../data/tasks';
import { Task } from '../Model/Task';
import mapTasks from '../helpers/mapTasks';

const localStorageKey = 'onmyoji-checklist';

const useTasks = (id: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(
        key,
        JSON.stringify([...dailyTasks, ...weeklyTasks, ...otherTasks])
      );
    } else {
      setTasks(mapTasks(data));
    }
  };

  useEffect(() => {
    loadTasks(localStorageKey);
  }, []);

  useEffect(() => {
    if (id) {
      loadTasks(`${localStorageKey}-${id}`);
    }

    if (id === '') {
      loadTasks(localStorageKey);
    }
  }, [id]);

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

  return { tasks, toggleTask };
};

export default useTasks;
