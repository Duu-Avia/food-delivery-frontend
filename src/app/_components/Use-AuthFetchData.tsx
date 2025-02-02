import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { foodTypes } from "./Food-card";


export function useAuthFetchData(path: string) {
  const {getToken} = useAuth()
  const [data, setData] = useState<foodTypes[]>([]);
  const fetchData = async () => {
    const token = await getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`,{
      headers:{
        authentication:`${token}`
      }
    });
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return data;
}