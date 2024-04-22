"use server"

import { db } from "@/app/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export const getDayBooking = async (barbershopId: string,date: Date) => {
  //SELECT * FROM BOOKING WHERE DATE <= 23H59 AND DATE >= 00H01
  const bookings = await db.booking.findMany({
    where: {
      barbershopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });

  return bookings;
};
