"use client";
import React from "react";

interface CounterContextProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const CounterContext = React.createContext<CounterContextProps>({
  counter: 0,
  setCounter: () => {},
});

export const CounterContextProvider: React.FC<React.PropsWithChildren> =
  // eslint-disable-next-line react/display-name
  React.memo(({ children }) => {
    const [counter, setCounter] = React.useState(0);

    const contextValue = React.useMemo(
      () => ({
        counter,
        setCounter,
      }),
      [counter, setCounter]
    );

    return (
      <CounterContext.Provider value={contextValue}>
        {children}
      </CounterContext.Provider>
    );
  });

export const useCounterContext = () =>
  React.useContext<CounterContextProps>(CounterContext);
