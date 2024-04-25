"use client"

import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent, CardFooter } from "./card";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Button } from "./button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { cancelBooking } from "@/app/actions/cancel-booking";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useState } from "react";

// interface para pegar os Bookings
interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const bookingIsFuture = isFuture(booking.date);

  //isLoading for delete Booking
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  //funcao de cancelar o agendamento
  const handleCancelBooking = async () =>  {
    //criando o state of loading to button
    setIsDeleteLoading(true)
    try {
      // chama a funcao e passamos o id do booking para que o cancelamento seja feito
      await cancelBooking(booking.id);
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error(`${error}`)
    }
    finally{
      //disabling the state of loading
      setIsDeleteLoading(false)
    }
  }
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Card className="cursor-pointer">
            <CardContent className="px-5 py-0 flex justify-between min-w-[20rem]">
              <div className="flex flex-col gap-2 py-5">
                <Badge
                  variant={bookingIsFuture ? "default" : "destructive"}
                  className="pointer-events-none w-fit"
                >
                  {isPast(booking.date) ? "Finalizado" : "Confirmado"}
                </Badge>

                <h2 className="font-bold">{booking.service.name}</h2>

                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>

                  <h3 className="text-sm">{booking.barbershop.name}</h3>
                </div>
              </div>
              {/* data e horário */}
              <div className="flex flex-col justify-center items-center border-l border-solid border-secondary px-3 min-w-[6rem]">
                <p className="text-sm capitalize">
                  {format(booking.date, "MMMM", {
                    locale: ptBR,
                  })}
                </p>
                <p className="text-2xl">{format(booking.date, "dd")}</p>
                <p className="text-sm">{format(booking.date, "hh'h'mm")}</p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="text-left pb-6 border-b border-solid border-secondary">
            <SheetTitle>Informações da Reserva</SheetTitle>
          </SheetHeader>
          <div className="relative mt-6">
            {/* card informaçoes */}
            <div className="w-full py-2 text-center">
              <Card>
                <CardContent className="p-2">
                  <div className="flex justify-center gap-3">
                    <Avatar>
                      <AvatarImage src={booking.barbershop.imageUrl} />
                    </Avatar>
                    <div className="">
                      <h2>{booking.barbershop.name}</h2>
                      <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                        {booking.barbershop.address}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* mapa */}
            <div className="">
              <iframe
                className="rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d913.8398969996432!2d-46.56867485493422!3d-23.627289991600286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5cc44a07442f%3A0x15c392980bad379b!2sPOSTO%20SHELL%20LEANDRINI%20%26%20DELLA%20COLLETA!5e0!3m2!1spt-BR!2sbr!4v1713981019554!5m2!1spt-BR!2sbr"
                width="100%"
                height="180px"
                loading="lazy"
              ></iframe>
            </div>

            <Card className="mt-4">
              <CardContent className="p-3 flex flex-col gap-3">
                {/* badge de status */}
                <Badge
                  variant={bookingIsFuture ? "default" : "destructive"}
                  className="pointer-events-none w-fit"
                >
                  {isPast(booking.date) ? "Finalizado" : "Confirmado"}
                </Badge>
                <div className="flex justify-between">
                  <h2 className="font-bold">{booking.service.name}</h2>
                  <h3 className="font-bold text-sm">
                    {Intl.NumberFormat("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(booking.service.price))}
                  </h3>
                </div>
                {/* texto data do agendamento */}
                <div className="flex justify-between">
                  <h3 className="text-gray-400">Data</h3>
                  <h4 className="text-sm">
                    {format(booking.date as Date, "dd 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </h4>
                </div>
                {/* texto horario do agendamento */}
                <div className="flex justify-between">
                  <h3 className="text-gray-400">Hora</h3>
                  <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
                </div>
                {/* texto nome da barbearia */}
                <div className="flex justify-between">
                  <h3 className="text-gray-400">Barbearia</h3>
                  <h4 className="text-sm">{booking.barbershop.name}</h4>
                </div>
              </CardContent>
            </Card>
            <SheetFooter className="mt-6">
              <div className="flex gap-3">
                {/* TODO WHATSAPP BUTTON */}
                {/* botao de fechar o sheet */}
                <SheetClose>
                  <Button variant={"secondary"} className="w-full"><ChevronLeft /> Voltar</Button>
                </SheetClose>
                {/* BOTÃO DESABILITADO CASO A RESERVA não for futura(confirmada)*/}
                <Button onClick={handleCancelBooking} disabled={!bookingIsFuture} variant={"destructive"} className="w-full">
                  {isDeleteLoading && <Loader2 className="mr-2 h-4 w-4"/>}
                  Cancelar Reserva
                  </Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BookingItem;
