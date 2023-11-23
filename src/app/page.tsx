import AuthCard from "@/components/AuthCard";

export default function Home() {
 return (
  <div
   className="
   h-[100vh] flex items-center justify-center
     "
   style={{
    backgroundImage: 'url("/laundry.jpg")',
   }}
  >
   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    {/* Auth Form */}
    <AuthCard />
   </div>
  </div>
 );
}
