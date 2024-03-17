import { useConnection } from "../contexts/Connection";
import { useConfig } from "../contexts/Config";
import Loading from "../pages/Loading";
import AppRoutes from "./app.routes";
import ConnectionRoutes from "./connection.routes";

export default function AppRouter() {
  const { config } = useConfig();
  const { connection } = useConnection();

  if (!config) {
    return <Loading />;
  }

  return <>{connection ? <AppRoutes /> : <ConnectionRoutes />}</>;
}
