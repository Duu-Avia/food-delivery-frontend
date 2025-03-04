"use client";
import { columns } from "@/app/_components/columns";
import { DataTable } from "@/app/_components/data-table";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
type Payment = {
  user: string;
  totalPrice: number;
  status: string;
  email: string;
};


export default function Page() {
  const { getToken } = useAuth();
  const [data, setData] = useState([]);
  // Fetch data from your API here.
  useEffect(() => {
    const fetchdata = async () => {
      const token = await getToken();
      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, { headers: { authentication: token } });
        const dat = await response.json();
        setData(dat);
        console.log("datanuud", dat);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
