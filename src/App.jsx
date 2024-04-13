import './App.css'
import ToDoList from './components/ToDoList'
import { TodoProvider } from './components/ToDoContext/ToDoContext'

function App() {

  return (
  <>
    <TodoProvider>
       <ToDoList/>
      </TodoProvider>
  </>
  );
}

export default App;
