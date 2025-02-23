function SidebarItems({ title, icon }: { title: string; icon: JSX.Element }) {
  return (
    <div className="flex text-lg items-center text-semibold transition-all duration-500 ease-in-out">
      <div className="pr-2">{icon}</div>
      {title}
    </div>
  );
}

export default SidebarItems;
