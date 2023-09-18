import './styles/Button.css'
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import IAppContext from "../interfaces/IAppContext";

export default function Delete() {
  
  const {onDelete} = useContext(AppContext) as IAppContext;

  return (
    <button className="button-big" onClick={onDelete}>Delete</button>
  )
}