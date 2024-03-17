import { createContext, useContext, useEffect, useState } from "react";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { ConfigContextData } from "../../types/ConfigContextData";
import { Config } from "../../types/Config";

declare const window: ElectronWindow;

const ConfigContext = createContext<ConfigContextData>(
  {} as ConfigContextData
);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    window.electronAPI.config((_, config) => {
      setConfig({ ...config });
    });
    window.electronAPI.getConfig();
    return () => {
      window.electronAPI.cleanListeners(["config"]);
    };
  }, []);

  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);

  return context;
}
