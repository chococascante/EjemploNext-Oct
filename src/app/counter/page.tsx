import React from "react";
import { Counter as CounterComponent } from "@/components/organisms/Counter";
import { CounterContextProvider } from "@/contexts/CounterContext";

const Counter = () => {
  return (
    <CounterContextProvider>
      <CounterComponent />
    </CounterContextProvider>
  );
};

export default Counter;
