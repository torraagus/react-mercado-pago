import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [mediosDePago, setMediosDePago] = useState([]);

  useEffect(() => {
    Axios.get("/medios")
      .then((response) => setMediosDePago(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      {mediosDePago.map((medios) => (
        <p>{medios.name}</p>
      ))}
    </div>
  );
}

export default App;
