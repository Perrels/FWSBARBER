import { Barbershop } from "@prisma/client";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../components/header";
import { db } from "../lib/prisma";
import { redirect } from "next/navigation";

interface BarbershopsPageSearchProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopsPageSearch = async ({
  searchParams,
}: BarbershopsPageSearchProps) => {
    //se não tiver nenhum parametro de busca redirecione o usuário de volta pra homepage
    if(!searchParams.search){
        redirect("/")
    }

  //query para localizar as barbershops de acordo com o searchParams
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-gray-400 text-xs font-bold uppercase">
          Resultados para `{searchParams.search}`
        </h1>
        
        {/* map para mostrar os items achados pela query */}
        <div className="grid grid-cols-2 mt-3 gap-4">
            {barbershops.map((barbershop) => (
               <div key={barbershop.id} className="w-full">
                 <BarbershopItem barbershop={barbershop} />
               </div>
            ))}
        </div>

      </div>
    </>
  );
};
export default BarbershopsPageSearch;
