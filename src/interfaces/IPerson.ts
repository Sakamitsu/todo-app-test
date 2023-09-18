export default interface IPerson {
  id: string,
  name: string,
  age: number,
  subscription: "Subscribed" | "Not Subscribed" | "Other",
  employment: "Employed" | "Unemployed"
}

export const defaultPerson: IPerson = {
  id: crypto.randomUUID(),
  name: "",
  age: NaN,
  subscription: "Subscribed",
  employment: "Unemployed"
};