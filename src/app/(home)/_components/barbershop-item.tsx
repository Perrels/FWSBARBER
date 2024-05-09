"use client"

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// depois de importar o MODEL do banco de dados vamos criar uma interface
// para que possamos pegar os atributos da entidade barbershop
interface BarbershopItemProps {
  barbershop: Barbershop;
}

//depois de pegar os atributos vamos colocar que nosso componente vai pegar as
//props da nossa interface e assim podemos utilizar no componente
const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  //chamando router
  const router = useRouter();
  //funcao de redirecionamento que vai ser chamada no botão reservar
  const handleBookingClick = () => {
    router.push(`/barbershop/${barbershop.id}`);
  };

  return (
    <div>
      <Card className="min-w-full max-w-full">
        <CardContent className="p-1">
          <div className="px-1 w-full h-[159px] relative">
            <div className="absolute top-2 left-2 z-50">
              <Badge
                variant="secondary"
                className="flex gap-1 items-center opacity-90"
              >
                <StarIcon size={12} className="fill-primary text-primary" />
                <span className="text-xs">5,0</span>
              </Badge>
            </div>

            <Image
              height={0}
              width={0}
              src={barbershop.imageUrl}
              alt={barbershop.name}
              sizes="100vw"
              style={{ objectFit: "cover" }}
              fill
              className="rounded-2xl"
            />
          </div>

          <div className="px-1">
            <h2 className="font-bold mt-2 text-ellipsis overflow-hidden text-nowrap">
              {barbershop.name}
            </h2>
            <p className="text-sm text-gray-400 text-ellipsis overflow-hidden text-nowrap">
              {barbershop.address}
            </p>

            <Button className="w-full mt-3" variant="secondary" onClick={handleBookingClick}>
              Reservar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarbershopItem;
