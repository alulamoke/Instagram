import { createContext, useContext } from "react";

import { useUser } from "@/hooks/useUser";

import { ApiLoading } from "@/components/ApiLoading";

type TAuthProviderProps = {
  children: React.ReactNode;
};

type TAuthProviderContextProps = {
  user: any;
};

export const AuthContext = createContext<TAuthProviderContextProps | null>(
  null,
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};

export const AuthProvider: React.FC<TAuthProviderProps> = ({ children }) => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <ApiLoading />;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
