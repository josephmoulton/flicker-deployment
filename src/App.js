import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Testing from "./pages/Testing";
import MovieProfile from "./pages/MovieProfile";
import Results from "./pages/Results";
import Credits from "./pages/Credits";
import GenreResults from "./pages/GenreResults";
import CrewProfile from "./pages/CrewProfile";
import Contact from "./pages/Contact";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/testing/:searchResult" element={<Testing />}></Route>
          <Route path="/profile/:id" element={<MovieProfile />}></Route>
          <Route path="/results/:searchResult" element={<Results />}></Route>
          <Route path="/profile/:id/credits/:color" element={<Credits />}></Route>
          <Route path="/genreResults/:genreId" element={<GenreResults />}></Route>
          <Route path="/crewprofile/:id" element={<CrewProfile />}></Route>
        </Routes>
      </div>
  );
}

export default App;
