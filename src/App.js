import './App.css';
import Board from './components/Board'

function App() {
  return (
    <div className=".App">
      <header>
      <h1 style={{display:'flex', justifyContent:'center',}}>Buscaminas</h1>
      <Board />
      </header>
    </div>
  );
}

export default App;
