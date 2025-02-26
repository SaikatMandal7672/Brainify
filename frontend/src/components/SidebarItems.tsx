import { JSX } from "react";
function SidebarItems({ title, icon }: { title: string; icon: JSX.Element }) {
  return (
    <div className="flex text-lg items-center text-semibold transition-all duration-500 ease-in-out">
      <div className="pr-2">{icon}</div>
      <div className="hidden sm:block">{title}</div>
      
    </div>
  );
}

export default SidebarItems;
