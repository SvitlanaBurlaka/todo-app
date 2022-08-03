import './App.css';
import { Header } from './components/Header';
import { TimeCounter } from './components/TimeCounter';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="App">
      <Header />
      <TimeCounter />
      <TodoList />
    </div>
  );
}

export default App;
