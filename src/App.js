import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import { PaymentForm } from "./components/payment/PaymentForm";
import styled from "styled-components"

const Title = styled.h1`
  color: tomato;
`;

function App() {
  // const [mediosDePago, setMediosDePago] = useState([]);

  // useEffect(() => {
  //   Axios.get("/medios")
  //     .then((response) => setMediosDePago(response.data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="App">
      <Title>Payments form</Title>
      <PaymentForm></PaymentForm>
      {/* {mediosDePago.map((medios) => (
        <p>{medios.name}</p>
      ))} */}
    </div>
  );
}

export default App;
