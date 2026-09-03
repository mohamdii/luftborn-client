export interface ProductDto {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    createdAt: string;
}

export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    stockQuantity?: number;
}