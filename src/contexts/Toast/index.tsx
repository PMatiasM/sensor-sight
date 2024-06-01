import { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";
import { ToastContextData } from "../../types/ToastContextData";

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toast = useRef<Toast | null>(null);

  const success = (message: string) =>
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
    });

  const warning = (message: string) =>
    toast.current?.show({
      severity: "warn",
      summary: "Warning",
      detail: message,
    });

  const error = (message: string) =>
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
    });

  return (
    <ToastContext.Provider value={{ success, warning, error }}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  return context;
}
