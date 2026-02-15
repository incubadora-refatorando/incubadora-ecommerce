import { Product } from "@/features/products/types";
import { ProductsClient } from "@/features/products/components/ProductsClient";

async function getProducts(): Promise<Product[]> {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
		const response = await fetch(`${apiUrl}/products`, {
			cache: 'no-store',
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

export default async function ProductsPage() {
	const products = await getProducts();

	return <ProductsClient products={products} />;
}
