import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

// interface para pegar os Bookings
interface BookingItemProps{
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true
        }
    }>
}

const BookingItem = ({booking}:BookingItemProps) => {
    const bookingIsFuture = isFuture(booking.date)
    return ( 
        <div className="">
            <Card>
                <CardContent className="px-5 py-0 flex justify-between">
                    <div className="flex flex-col gap-2 py-5">
                        <Badge variant={bookingIsFuture ? "default" : "destructive"} className="pointer-events-none w-fit"> 
                        {isPast(booking.date) ? "Finalizado" : "Confirmado"}
                        </Badge>

                        <h2 className="font-bold">{booking.service.name}</h2>
                        
                        <div className="flex items-center gap-2">
                            <Avatar> 
                                <AvatarImage src={booking.barbershop.imageUrl}/>
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>

                            <h3 className="text-sm">{booking.barbershop.name}</h3>
                        </div>

                    </div>
                    {/* data e horário */}
                    <div className="flex flex-col justify-center items-center border-l border-solid border-secondary px-3 min-w-[8rem]">
                        <p className="text-sm capitalize">{format(booking.date, "MMMM", {
                            locale: ptBR
                        })}</p>
                        <p className="text-2xl">{format(booking.date, "dd")}</p>
                        <p className="text-sm">{format(booking.date, "hh'h'mm")}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default BookingItem;