import { format } from "date-fns";
import Header from "../components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/ui/booking-item";
import { db } from "../lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import UserName from "../_components/ui/user-name";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  //get authenticated user session
  const session = await getServerSession(authOptions)


  //using promisse to run parallel querys with promisse
  const [barbershops, bookings] = await Promise.all([
    //chamar o prisma e localizar as barbearias cadastradas no BD
    db.barbershop.findMany({}),
    //call user`s bookings
    // if user is authenticated show bookings else show a empty array
    session?.user ? db.booking.findMany({
      where:{
        userId: (session.user as any).id,
        date:{
          gte: new Date()
        }
      },
      orderBy: {
        date: "asc"
      },
      include: {
        service: true,
        barbershop: true,
      }
    }) : Promise.resolve([]),

  ])
  
  return (
    <div>
      <Header />

      <div className="p-5">
        {/* <UserName /> */}
        <h2 className="text-xl font-bold">{session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá! Vamos agendar um corte?" }</h2>
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
          {/* iterando os agendamentos */}
        <div className="flex gap-3 overflow-x-auto">
          {bookings.map((booking) => (
            <BookingItem booking={booking} key={booking.id}/>
          ))}
        </div>
        
      </div>

      <div className="mt-6 px-5">
        <h2 className="uppercase text-sm text-gray-400 mb-3 mt-3">Recomendados</h2>
        {/* iterando barbershops recomendadas */}
        <div className="flex gap-2 overflow-x-auto">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6 px-5 mb-[4.5rem]">
        <h2 className="uppercase text-sm text-gray-400 mb-3 mt-3">Populares</h2>
        {/* iterando barbershops populares */}
        <div className="flex gap-2 overflow-x-auto">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

    </div>
  );
}
