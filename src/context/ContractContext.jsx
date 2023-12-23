import React, { useState } from "react";

export const ContractContext = React.createContext({
  contract: undefined,
  setContract: () => {},
});

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState();

  return (
    <ContractContext.Provider value={{ contract, setContract }}>
      {children}
    </ContractContext.Provider>
  );
};
