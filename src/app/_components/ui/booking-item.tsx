import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";

const BookingItem = () => {
    return ( 
        <div className="">
            <Card>
                <CardContent className="px-5 py-0 flex justify-between">
                    <div className="flex flex-col gap-2 py-5">
                        <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] pointer-events-none w-fit"> Confirmado</Badge>

                        <h2 className="font-bold">Corte de cabelo</h2>
                        
                        <div className="flex items-center gap-2">
                            <Avatar> 
                                <AvatarImage src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png"/>
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>

                            <h3 className="text-sm"> Vintage Barber</h3>
                        </div>

                    </div>

                    <div className="flex flex-col justify-center items-center border-l border-solid border-secondary px-3">
                        <p className="text-sm">Fevereiro</p>
                        <p className="text-2xl">06</p>
                        <p className="text-sm">09h45</p>
                    </div>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default BookingItem;