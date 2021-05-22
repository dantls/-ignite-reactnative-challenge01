import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle === ''){
      return;
    }
    const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
    }

    setTasks(oldState => [...oldState, data])

  }

  function handleMarkTaskAsDone(id: number) {
    const taskUpdated = tasks.find(task => task.id === id);

    if(!taskUpdated){
      return;
    }

    taskUpdated.done = !taskUpdated.done  

    setTasks(oldState => [...oldState, taskUpdated])
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(task => task.id !== id))
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}