import HomePage from "./pages/HomePage";
import "./styles/theme.css";

function App() {
  return (
    <div className="app-shell">
      <div className="app-bg"></div>

      <div className="container">
        <HomePage />
      </div>
    </div>
  );
}

export default App;