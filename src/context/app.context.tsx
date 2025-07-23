"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type JSX,
  useCallback,
} from "react";
import { loadData, saveData } from "../storage/app.storage";
import type { State } from "../types/stateTypes";

const defaultState: State = {
  appointments: [],
  isGridSelected: true,
  editingAppointmentId: null,
  sortAppointmentsBy: null,
  userType: null,
  userName: null,
  user: null,
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

  // Load from localStorage only after client-side mount
  useEffect(() => {
    const hydratedState: State = {
      appointments: loadData("appointments", []),
      isGridSelected: loadData("isGridSelected", true),
      editingAppointmentId: null,
      sortAppointmentsBy: loadData("sortAppointmentsBy", null),
      userType: loadData("userType", null),
      userName: loadData("userName", null),
      user: loadData("user", null),
    };
    setInternalState(hydratedState);
  }, []);

  const setState = useCallback(
    <K extends keyof State>(key: K, value: State[K]) => {
      setInternalState((prev) => {
        const updated = { ...prev, [key]: value };
        saveData(key, value);
        return updated;
      });
    },
    []
  );

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
