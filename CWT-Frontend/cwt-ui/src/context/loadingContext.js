import React, { createContext, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

export const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const loadingRef = useRef(null);

  const startLoading = () => {
    loadingRef.current?.continuousStart();
  };

  const stopLoading = () => {
    loadingRef.current?.complete();
  };

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      <LoadingBar color="#FF0000" ref={loadingRef} height={3} />
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
