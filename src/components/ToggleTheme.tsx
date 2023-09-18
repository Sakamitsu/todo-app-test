import './styles/ToggleTheme.css'
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import IThemeContext from '../interfaces/IThemeContext';

export default function ToggleTheme() {
  
  const { theme, toggleTheme } = useContext(ThemeContext) as IThemeContext;
  
  return (
    <div className="toggle">
      <label className="switch">
        <input 
          type="checkbox"
          checked={theme == "light-theme" ? true: false}
          onChange={() => toggleTheme()}
        />
        <span className="slider round"></span>
      </label>
      Mode: {theme}
    </div>
  )
}