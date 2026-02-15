import apiClient from "@/shared/lib/api-client";
import { Product } from "../types";

export const productsApi = {
	getAll: () => apiClient.get<{ products: Product[] }>("/products"),

	getById: (id: number) =>
		apiClient.get<{ product: Product }>(`/products/${id}`),
};
