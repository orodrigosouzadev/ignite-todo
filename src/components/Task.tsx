import { Trash } from 'phosphor-react'

import styles from './Task.module.css';

type TaskType = {
  id: string;
  content: string;
  completedAt: Date | null;
}

type TaskProps = {
  task: TaskType;
  onRemoveTask: (id: string) => void
  onToggleCompleteTask: (id: string) => void
}

export function Task({ task, onRemoveTask, onToggleCompleteTask }: TaskProps) {
  return (
    <div className={styles.task}>
      <input
        type="checkbox"
        className={styles.checkboxRound}
        title="Marcar/Desmarcar tarefa"
        checked={!!task.completedAt}
        onChange={() => onToggleCompleteTask(task.id)}
      />
      <span className={!!task.completedAt ? styles.completedTask : ''}>{task.content}</span>
      <button onClick={() => onRemoveTask(task.id)} title="Deletar tarefa">
        <Trash size={24} />
      </button>
    </div>
  )
}
