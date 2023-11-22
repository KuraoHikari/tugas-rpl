import Navbar from "@/components/Navbar";

export default async function Dashboardlayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <>
   <Navbar />
   {children}
  </>
 );
}
