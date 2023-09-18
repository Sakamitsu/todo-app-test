import IPerson from "./IPerson"

export default interface IAppContext {
  person: IPerson
  setPerson: (person: IPerson) => void
  onInsert: (newPerson: IPerson) => void
  onUpdate: (updatedPerson: IPerson) => void
  formMode: "Insert" | "Update"
  setFormMode: (formMode: "Insert" | "Update") => void
  onDelete: () => void
  people: IPerson[]
  selectedPersonInTable: IPerson | null
  onSelect: (selectedPerson: IPerson, formMode: "Insert"| "Update") => void
}