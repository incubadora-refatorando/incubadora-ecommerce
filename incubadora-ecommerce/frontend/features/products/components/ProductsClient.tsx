"use client";

import { Product } from "../types";
import { ProductCard } from "./ProductCard";
import { useUIStore } from "@/shared/store/uiStore";

interface ProductsClientProps {
	products: Product[];
}

export function ProductsClient({ products }: ProductsClientProps) {
	const { searchQuery } = useUIStore();

	const filteredProducts = searchQuery
		? products.filter(
				(product) =>
					product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.description
						?.toLowerCase()
						.includes(searchQuery.toLowerCase()),
			)
		: products;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-dark">
					{searchQuery ? "Resultados da Busca" : "Todos os Produtos"}
				</h1>
				<p className="text-gray-medium mt-2">
					{filteredProducts.length}{" "}
					{filteredProducts.length === 1 ? "produto" : "produtos"}
					{searchQuery && ` para "${searchQuery}"`}
				</p>
			</div>

			{filteredProducts.length === 0 ? (
				<div className="text-center py-16">
					<p className="text-gray-medium text-lg">
						{searchQuery
							? "Nenhum produto encontrado para sua busca."
							: "Nenhum produto disponível."}
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{filteredProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))}
				</div>
			)}
		</div>
	);
}
