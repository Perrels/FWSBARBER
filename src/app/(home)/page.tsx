import { format } from "date-fns";
import Header from "../components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/ui/booking-item";

export default function Home() {
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
          <hr />
          <h2 className="uppercase text-sm text-gray-400 mb-3 mt-3">Agendamentos</h2>
          <BookingItem />
      </div>
      
    </div>
  );
}
