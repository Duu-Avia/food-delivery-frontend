"use client"

import { useUser } from "@clerk/nextjs";

export default function AdminHomePage() {
  const {user, isLoaded} = useUser();
  if(!isLoaded){
    return null
  }
  const isAdmin =  user?.publicMetadata.role === "admin";

  return (<div>
   {isAdmin ? user?.publicMetadata.role : "You are not an admin"} 
    </div>);
}
