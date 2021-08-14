import React, { useRef, useState } from "react";
import "./App.css";
import TodoBootstrapTs from "./components/TodoBootstrapTs";

const App: React.FC = () => {
  const handleOnSubmit = () => {
    console.log("Sending...");
  };

  return (
    <>
      <TodoBootstrapTs/>      
    </>
  );
};

export default App;
