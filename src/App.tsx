import { Header } from './components/Header';
import paperImg from './assets/paper.svg';

import styles from './App.module.css';
import { Todo } from './components/Todo';

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Todo />
      </div>
    </div>
  )
}

export default App
