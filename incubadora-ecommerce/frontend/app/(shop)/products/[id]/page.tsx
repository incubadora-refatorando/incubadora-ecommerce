import { notFound } from "next/navigation";
import { Product } from "@/features/products/types";
import { ProductDetailClient } from "@/features/products/components/ProductDetailClient";

async function getProduct(id: string): Promise<Product | null> {
	try {
		const apiUrl =
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
		const response = await fetch(`${apiUrl}/products/${id}`, {
			cache: "no-store",
		});

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data.product || null;
	} catch (error) {
		console.error("Erro ao buscar produto:", error);
		return null;
	}
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = await getProduct(id);

	if (!product) {
		notFound();
	}

	return <ProductDetailClient product={product} />;
}
