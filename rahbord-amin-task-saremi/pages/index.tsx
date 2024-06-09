import CustomTable from "@/public/components/index/table";
import Image from "next/image";




export default function Home() {
  return (
   
    <main
      className="min-h-screen  h-full lg:p-24 p-5"
    >
       <div className="flex justify-center flex-col items-center w-full">
       <h1 className=" mb-4">لیست کارها</h1>
       </div>
     
    <CustomTable/>
   
    
    </main>
  );
}
