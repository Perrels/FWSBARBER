"use client"
import { useSession } from "next-auth/react";

const UserName = () => {
    const { data} = useSession();
    return ( <h2 className="text-xl font-bold">Olá {data?.user?.name}</h2>);
}
 
export default UserName;