export interface Product {
	id: number;
	name: string;
	description: string | null;
	price: string | number;
	image_url: string | null;
	stock: number;
	created_at: Date | string;
	updated_at: Date | string;
}
