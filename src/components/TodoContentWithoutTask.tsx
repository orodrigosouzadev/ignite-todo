import paperImg from '../assets/paper.svg';

import styles from './Todo.module.css';

export function TodoContentWithoutTask() {
  return (
    <div className={styles.todoContent}>
      <img src={paperImg} alt="imagem de bloco de anotações" />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}
