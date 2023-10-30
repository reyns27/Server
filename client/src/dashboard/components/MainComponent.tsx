import CardComponent from "./CardComponent"
import NavBarComponent from "./NavBarComponent"


const MainComponent = () => {
  return (
    <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
      <NavBarComponent />
      <CardComponent />
    </main>
  )
}

export default MainComponent
