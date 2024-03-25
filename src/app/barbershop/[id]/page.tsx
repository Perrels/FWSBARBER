import { db } from "@/app/lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { Badge } from "@/app/_components/ui/badge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//criando a interface para que possamos pegar os atributos do model Barbershop
interface BarbershopDetailsPageProps {
  //por enquanto vamos pegar somente o atributo any para que possamos testar nosso roteamento de pages
  params: {
    // usamos ? para quando é um parametro opcional
    id?: string;
  };
}

//Abaixo vemos como podemos capturar os atributos da nossa identidade
const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {

  //pegando a sessão do usuario num server component
  const session = await getServerSession(authOptions);

  //condicional para verificar se existe o id
  if (!params.id) {
    // TODO redirecionar para a home page e exibir alerta que o id não existe
    return null;
  }

  // vamos conectar no banco para pegar o id da barbearia e mostra-la na nossa page
  // esse é o SELECT do prisma e podemos usar findUnique ou findFirst, mas o
  // unique é mais rápido
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Service: true, // era pra ser services pois é uma lista de serviços
      // mas eu fiz caquita e no schema.prisma eu escrevi Service
    },
  });

  //verificar se o barbershop existe
  if (!barbershop) {
    //TODO redirecionar para a home page e exibir alerta que o id não existe
    return null;
  }
  //se existir mostre o componente
  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />
      <hr />
      <div className="flex items-center justify-center">
        <Badge
          variant="outline"
          className="font-bold text-gray-200 uppercase mt-4 mx-5"
        >
          Serviços
        </Badge>
      </div>

      <div className="flex flex-col gap-4 px-5 py-6">
        {/* MAP DE SERVICOS DA BARBERSHOP */}
        {barbershop.Service.map((service) => (
          <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
