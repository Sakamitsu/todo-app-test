import './styles/Menu.css'
import './styles/Button.css'
import ToggleTheme from './ToggleTheme';
import Delete from './Delete';
import {defaultPerson} from '../interfaces/IPerson';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import IAppContext from '../interfaces/IAppContext';
import { ThemeContext } from '../contexts/ThemeContext';
import IThemeContext from '../interfaces/IThemeContext';

export default function Menu() {
  
  const { theme } = useContext(ThemeContext) as IThemeContext;
  
  const {person, setPerson, onInsert, onUpdate, formMode, setFormMode} = useContext(AppContext) as IAppContext;
  
  const changeAge = (operation: "+"|"-") => {
    if (isNaN(Number(person.age))) {
      setPerson({...person, age: 18})
    }
    else {
      switch(operation) {
        case "+":
          setPerson({...person, age: ++person.age})
          break
        case "-":
          setPerson({...person, age: --person.age})
          break
      }
    }
  };

  const handleSubscription = (subscription: string) => {
    const newSub = subscription as "Subscribed" | "Not Subscribed" | "Other";
    setPerson({...person, subscription: newSub})
  };
  
  const handleEmployment = () => {
    person.employment === "Unemployed" ? 
      setPerson({...person, employment: "Employed"}) :
      setPerson({...person, employment: "Unemployed"})
  };

  const handleInsertUpdate = () => {
    if (person.age < 18 || isNaN(person.age)) {
      return
    }
      switch (formMode) {
        case "Update":
          onUpdate(person)
          setFormMode("Insert")
          setPerson({...defaultPerson, id: crypto.randomUUID()});
          break;
        case "Insert":
          onInsert(person);
          setPerson({...defaultPerson, id: crypto.randomUUID()});
      }
  }
  
  return (
    <fieldset className="menu-wrap">
      <legend>Insert row</legend>
      <input 
        className={`input-form ${theme}`}
        type="text"
        placeholder="Name"
        value={person.name}
        onChange={e => setPerson({...person, name: e.target.value})}   
      />
      <div className="age">
        <input 
          className={`input-form ${theme}`}
          type="number" 
          placeholder="Age"
          value={isNaN(person.age) ? "" : person.age}
          onChange={e => setPerson({...person, age: Number(e.target.value)})}   
        />
        <button 
          className="button-small" 
          onClick={() => changeAge("-")}
        >
            <span className="material-symbols-outlined">stat_minus_1</span>
        </button>
        <button 
          className="button-small" 
          onClick={() => changeAge("+")}
        >
            <span className="material-symbols-outlined">stat_1</span>
        </button>
      </div>
      <select 
        value={person.subscription} 
        onChange={e => handleSubscription(e.target.value)}>
        
        <option value="Subscribed">Subscribed</option>
        <option value="Not Subscribed">Not Subscribed</option>
        <option value="Other">Other</option>

      </select>
      <div className="checkbox-wrap">
        <input 
          className="checkbox"
          type="checkbox" 
          value={person.employment}
          checked={person.employment == "Employed" ? true: false} 
          onChange={handleEmployment}
        />
        <label htmlFor="Employed">Employed</label>
      </div>
      <button className="button-big" onClick={handleInsertUpdate}>
        {formMode}
      </button>
      <hr/>
      <ToggleTheme/>
      <Delete/>
    </fieldset>
  )
}