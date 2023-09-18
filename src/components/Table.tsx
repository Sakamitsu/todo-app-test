import './styles/Table.css'
import IPerson from '../interfaces/IPerson';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import IAppContext from '../interfaces/IAppContext';
import { ThemeContext } from '../contexts/ThemeContext';
import IThemeContext from '../interfaces/IThemeContext';

export default function Table() {
  
  const { theme } = useContext(ThemeContext) as IThemeContext;
  
  const {people, onSelect, selectedPersonInTable} = useContext(AppContext) as IAppContext;
  
  const handleClick = (clickNumber: number, selectedPerson: IPerson) => {
    switch (clickNumber) {
      case 1:
        onSelect(selectedPerson, "Insert")   
        break;
      case 2:
        onSelect(selectedPerson, "Update")
        break
    }
  }
  
  const listItems = people.map(person => {
    return (
      <tr 
        key={person.id} 
        onClick={(e) => handleClick(e.detail, person)}
        style={
          {
            backgroundColor: person.id === selectedPersonInTable?.id ? "var(--green)" : ""
          }
        }
      >
        <td>{person.name}</td>
        <td>{person.age}</td>
        <td>{person.subscription}</td>
        <td>{person.employment}</td>
      </tr>
    )
  });
  
  return (
    <div className='table-wrap'>
      <div className='scroll'>
        <table>
          <thead className={`thead ${theme}`}>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Subscription</th>
              <th>Employment</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
      </div>
    </div>
  )
}