import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export default function NotFound() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-md mx-auto text-center">
				<h2 className="text-3xl font-bold text-gray-dark mb-4">
					Produto Não Encontrado
				</h2>
				<p className="text-gray-medium mb-8">
					O produto que você está procurando não existe ou foi removido.
				</p>
				<Link href="/products">
					<Button className="text-white">Ver Todos os Produtos</Button>
				</Link>
			</div>
		</div>
	);
}
