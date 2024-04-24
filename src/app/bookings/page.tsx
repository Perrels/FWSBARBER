import { getServerSession } from "next-auth";
import Header from "../components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AlertLogin from "../_components/ui/alert-login";
import { db } from "../lib/prisma";
import BookingItem from "../_components/ui/booking-item";
import { Book } from "lucide-react";
import { isFuture, isPast } from "date-fns";

const BookingsPage = async () => {
  //recuperar a sessão do usuário (verificar se o user está logado)
  const session = await getServerSession(authOptions);

  //senão redirecionar para a página de login
  if (!session?.user) {
    return (
      <AlertLogin />
      // ou usa o que ele colocou pra usar redirect("/")
    );
  }

  //criando lista com os agendamentos do usuário
  const userBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    orderBy:{
        date: "desc"
    },
    include:{
        service:true,
        barbershop: true
    }
  });
    // filtrando os bookings confirmados
    const confirmedBookings = userBookings.filter((booking) => isFuture(booking.date))
    // filtrandos os bookings finalizados   
    const finishedBookings = userBookings.filter((booking) => isPast(booking.date))
  return (
    <>
      <Header />
      <div className="px-4 py-4">
        <h1 className="text-xl font-bold py-3">Agendamentos</h1>
        <hr />
        <h2 className="text-gray-400 font-bold text-sm uppercase pt-4">Confirmados</h2>
            {/* iterando os bookings encontrados confirmados */}
            {confirmedBookings.map((booking) => (
                <div className="py-2">
                    <BookingItem key={booking.id} booking={booking}/>
                </div>
            ))}
            <hr />
            {/* iterados e já finalizados */}
            <h2 className="text-gray-400 font-bold text-sm uppercase pt-4">Finalizados</h2>
            {/* iterando os bookings encontrados confirmados */}
            {finishedBookings.map((booking) => (
                <div className="py-2">
                    <BookingItem key={booking.id} booking={booking}/>
                </div>
            ))}

      </div>
    </>
  );
};

export default BookingsPage;
