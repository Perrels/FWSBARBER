import { signIn, signOut, useSession } from "next-auth/react";
import { SheetHeader, SheetTitle } from "./sheet";
import { Avatar, AvatarImage } from "./avatar";
import { Button } from "./button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const SideMenu = () => {

    // use session para pegar o usuario autenticado
  const { data, status } = useSession();

  const handleLoginClick = () => signIn("google");

  const handleLogoutClick = () => signOut();

  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary px-5 py-5">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      {/*se o usuário estiver autenticado mostre a foto dele*/}
      {data?.user ? (
        <div className="flex justify-between px-5 py-6 items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ""} />
            </Avatar>

            <h2 className="font-bold">{data.user.name}</h2>
          </div>

          <Button variant="secondary" size={"icon"} onClick={handleLogoutClick}>
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex flex-col px-5 py-6 gap-3">
            {/*se o usuário NÃO estiver autenticado MOSTRE PARA LOGAR*/}
            <div className="flex items-center gap-2">
              <UserIcon size={24} />
              <h2 className="font-bold">Olá, faça seu login!</h2>
            </div>
            <Button
              variant={"secondary"}
              className="w-full justify-start"
              onClick={handleLoginClick}
            >
              <LogInIcon className="mr-2" size={18} />
              Fazer login
            </Button>
          </div>
        </div>
      )}

      {/* DIV DE BOTÃO DE INICIO E BOTÃO DE AGENDAMENTOS */}
      <div className="flex flex-col gap-3 px-5">
        <Button variant={"outline"} className="justify-start" asChild>
          <Link href={"/"}>
            <HomeIcon size={18} className="mr-2" />
            Inicio
          </Link>
        </Button>
        {/* BOTÃO DE AGENDAMENTO SÓ É VISIVEL CASO O USER ESTEJA LOGADO */}
        {data?.user && (
          <Button variant={"outline"} className="justify-start" asChild>
            <Link href={"/bookings"}>
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
