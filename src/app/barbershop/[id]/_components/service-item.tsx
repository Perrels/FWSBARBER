"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { generateDayTime } from "../helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../actions/save-bookings";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBooking } from "../actions/get-day-bookings";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated?: boolean;
}

const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  //router
  const router = useRouter();
  const { data } = useSession();
  // armazenando a data selecionada no calendario
  const [date, setDate] = useState<Date | undefined>(new Date());
  //armazenando o horário selecionado
  const [hour, setHour] = useState<string | undefined>();
  // verificar se os dados foram carregados no submit
  const [isLoading, setSubmitIsLoading] = useState(false);
  //pegando o estado do sheets
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  //salvando lista reservas do dia no useState
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  // sempre que mudar o dia, atualizar a lista de horários
  useEffect(() => {
    if (!date) {
      return;
    }
    //pegando as reservas do dia selecionado
    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBooking(barbershop.id, date);

      setDayBookings(_dayBookings);
    };
    //atualizar os horários
    refreshAvailableHours();
    router.refresh();
  }, [date, barbershop.id]);

  //função para caso o user não estiver logado redirecione para o login
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }
    // TODO abrir modal de agendamento
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined); // ao selecionar uma data a hora vira undefined
  };

  //function for save the hour in use State
  const handleHourClick = (time: string) => {
    setHour(time);
  };

  // Criando uma lista de horários com base na data selecionada, utilizando o arquivo hours.ts
const timeList = useMemo(() => {
  // Se nenhuma data estiver selecionada, retorna uma lista vazia
  if (!date) {
    return [];
  }

  /**
   * Caso contrário, filtramos os horários disponíveis para agendamento,
   * mostrando apenas aqueles que ainda não foram reservados.
   */
  return generateDayTime(date).filter((time) => {
    // Extrai a hora e os minutos do horário atual
    const timeHour = Number(time.split(":")[0]);
    const timeMinutes = Number(time.split(":")[1]);

    // Verifica se há algum agendamento na lista "dayBookings" com a mesma hora e minutos
    const booking = dayBookings.find((booking) => {
      const bookingHour = booking.date.getHours();
      const bookingMinutes = booking.date.getMinutes();

      // Retorna verdadeiro se a reserva for encontrada nesse horário específico
      return bookingHour === timeHour && bookingMinutes === timeMinutes;
    });

    // Se não houver reserva para esse horário, inclui-o na lista de horários disponíveis
    if (!booking) {
      return true;
    }

    // Caso contrário, exclui o horário da lista, pois já está reservado
    return false;
  });
}, [date, dayBookings]);

  //funcao de salvar a reserva na tabela booking
  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);
    try {
      //verificar que a hora e o dia estão selecionados
      if (!hour || !date || !data?.user) {
        // caso não estejam retorne TODO ALERTA PARA SELIONAR HORA E DATA
        return;
      }

      //arrumando a data para armazenar no banco de forma correta
      const hourBooking = Number(hour.split(":")[0]); //pegando a hora da reserva
      const minuteBooking = Number(hour.split(":")[1]); // pegando o minuto da reserva
      //concatenando as horas com a data
      const dateHourBooking = setMinutes(
        setHours(date, hourBooking),
        minuteBooking
      );

      //chamando funcão saveBooking src\app\barbershop\[id]\actions\save-bookings.ts
      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: dateHourBooking,
        userId: (data.user as any).id,
      });
      //fechar o sheets ao finalizar a reserva
      setSheetIsOpen(false);
      //tirando os dados de data e hora depois de finalizar a reserva
      setHour(undefined);
      setDate(undefined);
      //toast de sucesso
      toast("Reserva realizada com sucesso!", {
        description: format(
          dateHourBooking,
          "'Para' dd 'de' MMMM 'às' HH':'mm",
          {
            locale: ptBR,
          }
        ),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 pt-3">
            {/*DIV IMAGEM*/}
            <div className="relative h-[8rem] w-[8rem] min-w-[8rem] min-h-[8rem] max-w-[8rem] max-h-[8rem]">
              <Image
                className="rounded-lg"
                src={service.imageUrl}
                alt={service.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            {/*DIV INFORMATIONS*/}
            <div className="flex flex-col w-full">
              <h2 className="font-bold">{service.name}</h2>
              <p className="text-sm text-gray-400">{service.description}</p>

              <div className="flex items-center justify-between mt-3">
                {/* pra passar valor sem dar pau
                tem que fazer um negócin brabo Intl
                */}
                <p className="text-primary font-bold text-sm">
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>
                <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                  <SheetTrigger>
                    <Button variant="secondary" onClick={handleBookingClick}>
                      {" "}
                      Reservar{" "}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="p-0">
                    <SheetHeader className="text-left px-5 py-7 border-b border-solid border-secondary">
                      <h3>Reserva do {service.name}</h3>
                    </SheetHeader>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      className="rounded-md border capitalize border-none mt-6 min-w-[100%]"
                      fromDate={new Date()}
                      locale={ptBR}
                      styles={{
                        head_cell: {
                          width: "100%",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "fit-content",
                        },
                        nav_button_next: {
                          width: "fit-content",
                        },
                      }}
                    />
                    {/* Mostrar lista e horários apenas se alguma data estiver selecionada */}
                    {date && (
                      <div className="flex gap-2 overflow-x-auto pt-5 pb-2 px-5 border-y border-solid border-secondary">
                        {timeList.map((time) => (
                          <Button
                            onClick={() => handleHourClick(time as string)}
                            key={time as any}
                            // se a hora for igual a armazenada na useDate então vai alterar a variant
                            variant={hour === time ? "default" : "outline"}
                            className="rounded-full"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* card info do servico */}
                    <div className="py-6 px-5 border-t border-solid border-secondary">
                      <Card>
                        <CardContent className="p-3 flex flex-col gap-3">
                          <div className="flex justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <h3 className="font-bold text-sm">
                              {Intl.NumberFormat("pt-br", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </h3>
                          </div>
                          {/* data só vai ser mostrada caso ela esteja selecionada no calendar */}
                          {date && (
                            <div className="flex justify-between">
                              <h3 className="text-gray-400">Data</h3>
                              <h4 className="text-sm">
                                {format(date as Date, "dd 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </h4>
                            </div>
                          )}

                          {/* hora só vai ser mostrada caso ela esteja selecionada nos horarios */}
                          {hour && (
                            <div className="flex justify-between">
                              <h3 className="text-gray-400">Hora</h3>
                              <h4 className="text-sm">{hour}</h4>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <h3 className="text-gray-400">Barbearia</h3>
                            <h4 className="text-sm">{barbershop.name}</h4>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    {/* FIM card info do servico */}
                    <SheetFooter className="px-5">
                      <Button
                        onClick={handleBookingSubmit}
                        className="w-full"
                        disabled={!date || !hour || isLoading}
                      >
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Confirmar reserva
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceItem;
