import React, { createContext } from 'react';
export const Context = createContext(null);

function ScopedContextProvider({ children }) {
  return (
    <Context.Provider value={null}>
      { children }
    </Context.Provider>
  );
}

export default ScopedContextProvider;