import React, { createContext, useState } from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [docId, setDocId] = useState(null);

  return (
    <HistoryContext.Provider value={{ docId, setDocId }}>
      {children}
    </HistoryContext.Provider>
  );
};
