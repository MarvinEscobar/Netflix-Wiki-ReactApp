import React, { createContext, useState } from 'react';

export const ScopedContext = createContext(null);

function ScopedContextProvider({ children }) {
  let [selectedCountry, setSelectedCountry] = useState(null);

  const data = {
    setSelectedCountry: setSelectedCountry,
    selectedCountry: selectedCountry
  };

  return (
    <ScopedContext.Provider value={data}>
      { children }
    </ScopedContext.Provider>
  );
}

export default ScopedContextProvider;