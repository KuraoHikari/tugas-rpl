import MainNav from "./MainNav";

const Navbar = async () => {
 return (
  <div className="border-b">
   <div className="flex h-16 items-center px-4">
    <MainNav className="mx-6" />
   </div>
  </div>
 );
};

export default Navbar;
