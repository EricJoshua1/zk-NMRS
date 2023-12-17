import React, { useState } from "react";

export const UserContext = React.createContext({
  user: undefined,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  // reporter | manager | supervisor
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
