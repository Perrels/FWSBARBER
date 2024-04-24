"use client";

import Image from "next/image";
import { Card, CardContent } from "../_components/ui/card";
import { Button } from "../_components/ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../_components/ui/sheet";
import { Avatar, AvatarImage } from "../_components/ui/avatar";
import Link from "next/link";
import SideMenu from "../_components/ui/side-menu";

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="p-5 justify-between flex flex-row items-center">
          <Link href={"/"}><Image src="/logo.png" alt="imagem" height={22} width={120} /></Link>
          <Sheet>
            <SheetTrigger>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MenuIcon size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
              {/*CHAMANDO NOSSO NOVO COMPONENTE DE MENU LATERAL*/}
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;
