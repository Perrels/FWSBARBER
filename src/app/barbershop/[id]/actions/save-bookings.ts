"use server"

import { db } from "@/app/lib/prisma"

// interface para pegar os dados que vão ser gravados na tabela bookings
interface SaveBookingParams{
    barbershopId : string,
    serviceId: string,
    userId: string,
    date: Date,
}

// funcao de criar uma reserva na tabela booking
export const saveBooking = async (params: SaveBookingParams) => {
    await db.booking.create({
        data:{
            serviceID: params.serviceId,
            userId: params.userId,
            date: params.date,
            barbershopId: params.barbershopId
        }
    })
}