import { useEffect, useState } from 'react';
import { dailyTasks, weeklyTasks, otherTasks } from '../data/tasks-seed';
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

  // update all tasks, used to update the tasks data structure.
  const flushTasks = (userId: string) => {
    const key = userId !== '' ? `${localStorageKey}-${id}` : localStorageKey;
    const data = localStorage.getItem(key);
    const ALL_TASKS = [...dailyTasks, ...weeklyTasks, ...otherTasks];

    if (data) {
      const tasks = JSON.parse(data) as Task[];
      try {
        const updatedData = tasks.map((task) => {
          const seedTask = ALL_TASKS.find(
            (t) => t.id === task.id || t.name === task.name
          );
          if (seedTask) return { ...task, ...seedTask };
          return task;
        });

        localStorage.setItem(key, JSON.stringify(updatedData));
      } catch (error) {
        console.log('flush tasks failed: ', error);
      }
    } else {
      localStorage.setItem(key, JSON.stringify(ALL_TASKS));
    }
  };

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

  const postponeTask = (...args:any) => {
    console.log(args);
  } 

  return { tasks, toggleTask, flushTasks };
};

export default useTasks;
