"use client";
import React from "react";
import { Button } from "@mui/material";
import { useCounterContext } from "../../contexts/CounterContext";

export const Counter = () => {
  const { counter, setCounter } = useCounterContext();

  const onIncrement = () => {
    setCounter((prevCounter: number) => prevCounter + 1);
  };

  const onDecrement = () => {
    setCounter((prevCounter: number) => prevCounter - 1);
  };

  return (
    <div
      style={{
        width: "350px",
      }}
    >
      <p>Contador Context</p>
      <p
        style={{
          fontSize: "50px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {counter}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" onClick={onIncrement}>
          Incrementar
        </Button>
        <Button onClick={onDecrement}>Decrementar</Button>
      </div>
    </div>
  );
};
