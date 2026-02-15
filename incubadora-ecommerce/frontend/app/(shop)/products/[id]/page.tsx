"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Product } from "@/features/products/types";
import { ProductRating } from "@/features/products/components/ProductRating";
import { useCartStore } from "@/features/cart/store";
import apiClient from "@/shared/lib/api-client";
import { toast } from "sonner";

export default function ProductPage() {
	const params = useParams();
	const router = useRouter();
	const { addItem } = useCartStore();
	const [product, setProduct] = useState<Product | null>(null);
	const [quantity, setQuantity] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [isAddingToCart, setIsAddingToCart] = useState(false);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await apiClient.get<{ product: Product }>(
					`/products/${params.id}`,
				);
				setProduct(response.data.product);
			} catch (error) {
				toast.error("Produto não encontrado");
				router.push("/products");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProduct();
	}, [params.id, router]);

	const handleAddToCart = async () => {
		if (!product) return;

		setIsAddingToCart(true);
		try {
			await addItem(product.id, quantity);
			toast.success("Adicionado ao carrinho!");
		} catch (error) {
			toast.error("Erro ao adicionar ao carrinho");
		} finally {
			setIsAddingToCart(false);
		}
	};

	const handleBuyNow = async () => {
		await handleAddToCart();
		router.push("/cart");
	};

	const formatPrice = (price: string | number) => {
		const priceNumber = typeof price === "string" ? parseFloat(price) : price;
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(priceNumber);
	};

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="aspect-square bg-gray-light rounded-lg animate-pulse" />
						<div className="space-y-4">
							<div className="h-8 bg-gray-light rounded animate-pulse" />
							<div className="h-6 bg-gray-light rounded animate-pulse w-1/2" />
							<div className="h-32 bg-gray-light rounded animate-pulse" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!product) return null;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				{/* Back Button */}
				<Button
					variant="ghost"
					onClick={() => router.back()}
					className="mb-6">
					<ArrowLeft className="w-4 h-4 mr-2" />
					Voltar
				</Button>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Product Image */}
					<Card className="overflow-hidden">
						<div className="relative aspect-square bg-gray-light">
							{product.image_url ? (
								<Image
									src={product.image_url}
									alt={product.name}
									fill
									className="object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-medium">
									Imagem Indisponível
								</div>
							)}
						</div>
					</Card>

					{/* Product Info */}
					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold text-gray-dark mb-2">
								{product.name}
							</h1>
							<ProductRating
								rating={4.5}
								count={121}
							/>
						</div>

						<div className="border-t border-b border-border py-4">
							<div className="text-3xl font-bold text-primary">
								{formatPrice(product.price)}
							</div>
						</div>

						{product.description && (
							<div>
								<h3 className="font-semibold text-gray-dark mb-2">Descrição</h3>
								<p className="text-gray-medium">{product.description}</p>
							</div>
						)}

						<div>
							<h3 className="font-semibold text-gray-dark mb-3">Quantidade</h3>
							<div className="flex items-center gap-2">
								<div className="flex items-center border border-border rounded-lg">
									<Button
										variant="ghost"
										size="icon-sm"
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										disabled={quantity <= 1}>
										<Minus className="w-4 h-4" />
									</Button>
									<span className="px-6 py-2 text-sm font-medium border-x border-border min-w-[3rem] text-center">
										{quantity}
									</span>
									<Button
										variant="ghost"
										size="icon-sm"
										onClick={() =>
											setQuantity(Math.min(product.stock, quantity + 1))
										}
										disabled={quantity >= product.stock}>
										<Plus className="w-4 h-4" />
									</Button>
								</div>
								<span className="text-sm text-gray-medium">
									{product.stock} disponíveis
								</span>
							</div>
						</div>

						<div className="flex gap-4">
							<Button
								onClick={handleBuyNow}
								disabled={product.stock === 0 || isAddingToCart}
								size="lg"
								className="flex-1">
								Comprar Agora
							</Button>
							<Button
								onClick={handleAddToCart}
								disabled={product.stock === 0 || isAddingToCart}
								variant="outline"
								size="lg"
								className="flex-1">
								<ShoppingCart className="w-4 h-4 mr-2" />
								Adicionar ao Carrinho
							</Button>
						</div>

						{product.stock === 0 && (
							<p className="text-error font-medium">Fora de Estoque</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
