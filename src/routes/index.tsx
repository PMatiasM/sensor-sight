import { useExperiment } from "../contexts/Experiment";
import { useConfig } from "../contexts/Config";
import Loading from "../pages/Loading";
import AppRoutes from "./app.routes";
import ConnectionRoutes from "./connection.routes";

export default function AppRouter() {
  const { config } = useConfig();
  const { experiment, connection } = useExperiment();

  if (!config) {
    return <Loading />;
  }

  return <>{experiment && connection ? <AppRoutes /> : <ConnectionRoutes />}</>;
}
