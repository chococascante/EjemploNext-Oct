import React from "react";
import type { User } from "../types";

interface UsersContextProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loadingUsers: boolean;
}

//1. Crear el contexto
const UsersContext = React.createContext<UsersContextProps>({
  users: [],
  setUsers: () => {},
  loadingUsers: false,
});

export const UsersContextProvider: React.FC<React.PropsWithChildren> =
  React.memo(({ children }) => {
    // 3. Crear el estado
    const [users, setUsers] = React.useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = React.useState<boolean>(false);

    React.useEffect(() => {
      async function traerUsuarios() {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const usersJSON = await response.json();
        setUsers(usersJSON);
        setLoadingUsers(false);
      }

      traerUsuarios();
    }, []);

    // 4 crear el valor del contexto
    const contextValue: UsersContextProps = React.useMemo(
      () => ({
        users,
        setUsers,
        loadingUsers,
      }),
      [loadingUsers, users]
    );

    // 5. Utilizar el proveedor para inyectar valores a los hijos
    return (
      <UsersContext.Provider value={contextValue}>
        {children}
      </UsersContext.Provider>
    );
  });

//2. Crear un hook para consumir el contexto
export const useUserContext = () =>
  React.useContext<UsersContextProps>(UsersContext);
