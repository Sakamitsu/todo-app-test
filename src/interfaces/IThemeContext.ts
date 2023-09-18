export default interface IThemeContext {
  theme: "dark-theme" | "light-theme"
  setTheme: (theme: "dark-theme" | "light-theme") => void
  toggleTheme: () => void
}