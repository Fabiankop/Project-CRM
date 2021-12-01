import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AppRouter from "./router/router";
import Footer from "./components/footer/footer"

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
