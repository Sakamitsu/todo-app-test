import './styles/App.css'

import { useState, useContext, useEffect } from 'react'

import Menu from './Menu'
import Table from './Table'

import IPerson from '../interfaces/IPerson';
import { defaultPerson } from '../interfaces/IPerson';
import IThemeContext from '../interfaces/IThemeContext'

import { ThemeContext } from '../contexts/ThemeContext';
import { AppContext } from '../contexts/AppContext'

export default function App() {
  
  const { theme } = useContext(ThemeContext) as IThemeContext;

  const [people, setPeople] = useState<IPerson[]>(() => {
    const localPeople = localStorage.getItem("people");
    if (localPeople === null) {
      return []
    }
    return JSON.parse(localPeople)
  });
  const [personInFormMenu, setPersonInFormMenu] = useState<IPerson>(defaultPerson);
  const [selectedPersonInTable, setSelectedPersonInTable] = useState<IPerson|null>(null);
  const [formMode, setFormMode] = useState<"Insert"|"Update">("Insert");

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people))
  }, [people])

  const handleInsert = (newPerson: IPerson) => {
    if (people.some(person => person.id === newPerson.id)) {
      setPeople([...people, {...newPerson, id: crypto.randomUUID()}])
    }
    else {
      setPeople([...people, newPerson])
    }
  }

  const handleUpdate = (updatedPerson: IPerson) => {
    const newPeople = people.map(p => 
      p.id === updatedPerson.id ? updatedPerson : p
    );
    setPeople(newPeople)
  }

  const handleDelete = () => {
    const newPeople = people.filter((p) => p.id !== selectedPersonInTable?.id);
    setPeople(newPeople)
  }
  
  const handleSelect = (selectedPerson: IPerson, formMode: "Insert"|"Update") => {
      setSelectedPersonInTable(selectedPerson);
      setFormMode(formMode);
      if (formMode === "Update") {
        setPersonInFormMenu(selectedPerson)
      }
  }
  
  return (
    <div className={`Main-Wrap ${theme}`}>
      <div className={`App ${theme}`}>
      <AppContext.Provider value={
        {
          person: personInFormMenu,
          setPerson: setPersonInFormMenu,
          onInsert: handleInsert,
          onUpdate: handleUpdate, 
          formMode: formMode,
          setFormMode: setFormMode,
          onDelete: handleDelete,
          people: people,
          selectedPersonInTable: selectedPersonInTable,
          onSelect: handleSelect
        }
      }>
        <Menu/>
        <Table/>
      </AppContext.Provider>
      </div>
    </div>
  )
}
