import { ProgressSpinner } from "primereact/progressspinner";

export default function Loading() {
  return (
    <div className="flex justify-content-center align-items-center w-full h-full">
      <ProgressSpinner />
    </div>
  );
}
