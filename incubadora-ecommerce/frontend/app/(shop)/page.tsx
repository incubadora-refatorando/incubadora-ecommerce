import { Product } from "@/features/products/types";
import { ProductGrid } from "@/features/products/components/ProductGrid";

async function getProducts(): Promise<Product[]> {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
		const response = await fetch(`${apiUrl}/products`, {
			cache: 'no-store', // Sempre busca dados frescos
		});

		if (!response.ok) {
			throw new Error('Falha ao carregar produtos');
		}

		const data = await response.json();
		return data.products || [];
	} catch (error) {
		console.error('Erro ao buscar produtos:', error);
		return [];
	}
}

export default async function HomePage() {
	const products = await getProducts();

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Banner */}
			<div className="bg-cream rounded-lg p-12 mb-12 flex items-center justify-between">
				<div className="max-w-lg">
					<h1 className="text-4xl font-bold text-gray-dark mb-4">
						Até 50% de Desconto em Headphones Selecionados
					</h1>
					<button className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-hover transition">
						Compre Agora
					</button>
				</div>
				<div className="hidden lg:block">
					{/* Espaço para imagem do banner - pode adicionar depois */}
				</div>
			</div>

			{/* Products Section */}
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-dark mb-6">
					Produtos Para Você!
				</h2>
			</div>

			<ProductGrid
				products={products}
				isLoading={false}
				columns={4}
			/>
		</div>
	);
}
