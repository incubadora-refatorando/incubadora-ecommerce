"use client";

import { useEffect, useState } from "react";
import { Product } from "@/features/products/types";
import { productsApi } from "@/features/products/api";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { toast } from "sonner";

export default function HomePage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await productsApi.getAll();
				setProducts(response.data.products);
			} catch {
				toast.error("Erro ao carregar produtos");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

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
				isLoading={isLoading}
				columns={4}
			/>
		</div>
	);
}
