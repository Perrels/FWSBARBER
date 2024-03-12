import Image from "next/image";
import { Card, CardContent } from "../_components/ui/card";
import { Button } from "../_components/ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="p-5 justify-between flex flex-row items-center" >
          <Image src="/logo.png" alt="imagem" height={22} width={120} />
          <Button variant="outline" size="icon" className="h-8 w-8">
            <MenuIcon size={18}/>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;