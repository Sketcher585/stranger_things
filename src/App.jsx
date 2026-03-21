import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TriviaSection from './components/TriviaSection';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <TriviaSection />
    </div>
  );
}

export default App;
