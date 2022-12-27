import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Task } from './Task';

import styles from './Todo.module.css';
import { TodoContentWithoutTask } from './TodoContentWithoutTask';

type TodoType = {
  id: string;
  content: string;
  completedAt: Date | null;
}

export function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTask, setNewTask] = useState('');

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()
    if (newTask.trim().length > 0) {
      setTodos([...todos, {
        id: uuidv4(),
        content: newTask.trim(),
        completedAt: null,
      }]);
      setNewTask('');
    }
  }

  function handleRemoveTask(id: string) {
    setTodos((state) => state.filter(task => task.id !== id))
  }

  function handleToggleCompleteTask(id: string) {
    setTodos((state) => state.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completedAt: task.completedAt ? null : new Date()
        }
      }
      return task
    }))
  }

  const todosOrdered = useMemo(() => {
    const completedTasks = todos.filter(task => !!task.completedAt);
    const uncompletedTasks = todos.filter(task => task.completedAt === null);
    return [...uncompletedTasks, ...completedTasks];
  }, [todos]);
  const hasTask = useMemo(() => {
    return todos.length > 0;
  }, [todos]);
  const createdTasks = useMemo(() => {
    return todos.length;
  }, [todos]);
  const completedTasks = useMemo(() => {
    return todos.reduce((acc, task) => {
      if (!!task.completedAt) {
        return acc += 1;
      }
      return acc;
    }, 0)
  }, [todos]);

  return (
    <main className={styles.main}>
      <form onSubmit={handleCreateTask} className={styles.form}>
        <input
          type="text"
          value={newTask}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setNewTask(event.target.value)}
        />
        <button type='submit'>
          Criar
          <PlusCircle size={16} />
        </button>
      </form>
      <div className={styles.todo}>
        <header>
          <div>
            <strong className={styles.createdTasks}>Tarefas criadas</strong>
            <span>{createdTasks}</span>
          </div>
          <div>
            <strong className={styles.completedTasks}>Concluídas</strong>
            <span>{completedTasks}</span>
          </div>
        </header>
        {hasTask ? (
          todosOrdered.map(todo => (
            <Task
              key={todo.id}
              task={todo}
              onRemoveTask={handleRemoveTask}
              onToggleCompleteTask={handleToggleCompleteTask}
            />
          ))
        ) : (
          <TodoContentWithoutTask />
        )}
      </div>
    </main>
  )
}
