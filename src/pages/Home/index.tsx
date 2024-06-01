import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import Logo from "../../components/Logo";
import SettingsDialog from "../../components/SettingsDialog";
import { useDialogController } from "../../hooks/useDialogController";

export default function Home() {
  const navigate = useNavigate();
  const settingsDialog = useDialogController();
  return (
    <div className="flex justify-content-center align-items-center w-full h-full p-6">
      <div className="card flex flex-column justify-content-evenly align-items-center relative w-8 h-full">
        <div className="flex justify-content-center align-items-center w-7">
          <Logo />
        </div>
        <div className="flex flex-column align-items-center w-full">
          <Button
            className="flex justify-content-center align-items-center w-5 my-2"
            outlined
            onClick={() => navigate("/experiments")}
          >
            <span className="text-xl">Start</span>
          </Button>
          <Button
            className="flex justify-content-center align-items-center w-5 my-2"
            outlined
            onClick={() => navigate("/")}
          >
            <span className="text-xl">Learn</span>
          </Button>
          <Button
            className="flex justify-content-center align-items-center w-5 my-2"
            outlined
            onClick={() => navigate("/history")}
          >
            <span className="text-xl">History</span>
          </Button>
        </div>
        <Button
          className="absolute bottom-0 right-0 m-3 p-2"
          outlined
          onClick={settingsDialog.open}
        >
          <i className="pi pi-cog text-4xl" />
        </Button>
      </div>
      <SettingsDialog settingsDialog={settingsDialog} />
    </div>
  );
}
