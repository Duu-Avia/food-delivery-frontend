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

export const payments: Payment[] = [
  {
    user: "728ed52f",
    totalPrice: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    user: "489e1d42",
    totalPrice: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

export default function Page() {
  const { getToken } = useAuth();
  const [data, setData] = useState([]);
  // Fetch data from your API here.
  useEffect(() => {
    const fetchdata = async () => {
      const token = await getToken();
      if (token) {
        const response = await fetch(`http://localhost:8000/order`, { headers: { authentication: token } });
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
