"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type JSX,
} from "react";
import { loadData, saveData } from "../storage/app.storage";
import type { State } from "../types/stateTypes";

const defaultState: State = {
  appointments: loadData("appointments", []),
  isGridSelected: loadData("isGridSelected", true),
  editingAppointmentId: null,
  sortAppointmentsBy: loadData("sortAppointmentsBy", null),
  userType: loadData("userType", "patient"),
  token: loadData("token", null),
  userName: loadData("userName", null),
};

interface AppContextType {
  state: State;
  setState: <K extends keyof State>(key: K, value: State[K]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [state, setInternalState] = useState<State>(defaultState);

  const setState = <K extends keyof State>(key: K, value: State[K]) => {
    setInternalState((prev) => {
      const updated = { ...prev, [key]: value };
      saveData(key, value);
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
