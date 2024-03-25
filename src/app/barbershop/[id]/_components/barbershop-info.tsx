"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import SideMenu from "@/app/_components/ui/side-menu";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPin, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter(); //setando o router
  //função de voltar
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      {/* CLASSE HEADER ONDE FICA A IMAGEM E OS BOTÕES DE NAVEGAÇÃO */}
      <div className="h-[30vh] w-full relative">
        {/* BOTÃO DE VOLTAR */}
        <Button
          onClick={handleBackClick} //chamada da função para voltar no botão
          size={"icon"}
          className="absolute z-50 top-3 left-3"
          variant="outline"
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger>
            {/* BOTÃO DE MENU */}
            <Button
              size={"icon"}
              className="absolute z-50 top-3 right-3"
              variant="outline"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            {/*CHAMANDO NOSSO NOVO COMPONENTE DE MENU LATERAL*/}
            <SideMenu />
          </SheetContent>
        </Sheet>
        
        {/* IMAGEM HEADER */}
        <Image
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          style={{
            objectFit: "cover",
          }}
          className="opacity-75"
        />
      </div>
      {/**/}
      {/* DIV DE TITULO E SUBTITULO*/}
      <div className="px-5 py-3 border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="flex flex-col gap-2 p-1">
          <div className="flex items-center gap-1">
            <MapPin className="text-primary" size={18} />
            <p className="text-sm"> {barbershop.address}</p>
          </div>

          <div className="flex items-center gap-1">
            <StarIcon className="text-primary" size={18} />
            <p className="text-sm">
              <span className="font-bold"> 5,0 </span>(800 avaliações)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
