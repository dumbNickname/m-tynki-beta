import { Loading, onSettled } from "solid-js";
import { Router } from "./router";
import { initMotion } from "./utils/motion";
import "./styles/global.css";

export default function App() {
  onSettled(() => initMotion());
  return <Router>{(props) => <Loading>{props.children}</Loading>}</Router>;
}
