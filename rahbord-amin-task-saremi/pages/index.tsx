import CustomTable from "@/public/components/index/table";
import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (

    <main
      className="min-h-screen  h-full lg:p-24 p-5"
    >
      <div className="justify-between gap-3 gap-1 items-centers mt-8 mt-4 col-span-12 lg:col-span-8 relative grid xxl:col-span-9"></div>
       <div className="flex justify-center flex-col items-center w-full">
       <h1 className=" mb-4">لیست کارها</h1>
       </div>
       <Link 
       href={"/add-task"}
       className="btn btn-primary mb-4">
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-plus w-4 h-4"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        افزودن کار 
      </Link>
      
    <CustomTable/>
   
    
    </main>
  );
}
