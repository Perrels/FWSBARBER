import { format } from "date-fns";
import Header from "../components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/ui/booking-item";
import { db } from "../lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

export default async function Home() {
  //chamar o prisma e localizar as barbearias cadastradas no BD
  const barbershops = await db.barbershop.findMany({})

  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá Mundo</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE ',' dd 'de' MMMM ", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="uppercase text-sm text-gray-400 mb-3 mt-3">
          Agendamentos
        </h2>
        <BookingItem />
      </div>

      <div className="mt-6 px-5">
        <h2 className="uppercase text-sm text-gray-400 mb-3 mt-3">Recomendados</h2>
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6 px-5 mb-[4.5rem]">
        <h2 className="uppercase text-sm text-gray-400 mb-3 mt-3">Populares</h2>
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

    </div>
  );
}
