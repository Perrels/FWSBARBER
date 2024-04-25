"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/prisma";

// deletendo o booking do banco
export const cancelBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });
  //vai recarregar o cache da page bookings
  revalidatePath("/bookings")
};
