import React, { createContext, useContext, useState } from 'react';

const ProfessorContext = createContext();

export const useProfessorContext = () => {
  return useContext(ProfessorContext);
};

export const ProfessorProvider = ({ children }) => {
  const [nombreCarrera, setNombreCarrera] = useState('');
  const [nombreRamo, setNombreRamo] = useState('');

  return (
    <ProfessorContext.Provider value={{ nombreCarrera, setNombreCarrera, nombreRamo, setNombreRamo }}>
      {children}
    </ProfessorContext.Provider>
  );
};
