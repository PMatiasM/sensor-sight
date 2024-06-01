import { Ripple } from "primereact/ripple";
import { useExperiment } from "../../contexts/Experiment";
import Logo from "../Logo";

export default function Sidebar() {
  const { experiment, handleWriting, disconnect } = useExperiment();
  return (
    <div className="card flex flex-column p-0 mb-0 border-noround	w-2 h-full">
      <div className="flex align-items-center justify-content-center px-4 pt-3 flex-shrink-0">
        <div className="w-full">
          <Logo />
        </div>
      </div>
      <div className="overflow-y-auto">
        <ul className="list-none p-3 m-0">
          <li>
            <ul className="list-none p-0 m-0 overflow-hidden">
              {experiment!.buttons.map((button, index) => (
                <li key={`sidebar-button-${index}`}>
                  <a
                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                    onClick={() => handleWriting(button.code)}
                  >
                    <i className="pi pi-code mr-2" />
                    <span className="font-medium">{button.name}</span>
                    <Ripple />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
        <a
          v-ripple="true"
          className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:bg-red-500 transition-duration-150 transition-colors p-ripple"
          onClick={disconnect}
        >
          <i className="pi pi-ban mr-2" />
          <span className="font-bold">Disconnect</span>
        </a>
      </div>
    </div>
  );
}
