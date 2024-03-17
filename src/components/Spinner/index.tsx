import { Div } from "./styles";

export default function Spinner() {
  return (
    <Div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </Div>
  );
}
