import { createContext } from "react";
import IAppContext from '../interfaces/IAppContext'

export const AppContext = createContext<IAppContext | string >("without provider");