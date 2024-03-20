import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import Image from "next/image";

interface ServiceItemProps {
  service: Service;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
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
                <p className="text-primary font-bold text-sm">{Intl.NumberFormat("pt-br",{
                  style: "currency",
                  currency: "BRL"
                }).format(Number(service.price))}</p>

                <Button variant="secondary"> Reservar </Button>
              </div>
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceItem;
