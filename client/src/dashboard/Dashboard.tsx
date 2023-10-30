import MainComponent from "./components/MainComponent"
import SidenavComponents from "./components/SidenavComponents"


export const Dashboard = () => {
  return (
    <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-50 text-slate-500">
      <SidenavComponents />
      <MainComponent />

    </div>
  )
}
