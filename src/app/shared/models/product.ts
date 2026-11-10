// List item, as used by GET /api/products
export interface Product {
  id: number;
  name: string;
  description: string;
  vegeterian: boolean;
  spiciness: number;
  rate: number;
  price: number;
  image: string;
  canDelete: boolean;
}

export interface ProductsData {
  products: Product[];
}

// Full product, as returned by GET /api/products/{id} (from Swagger)
export interface ProductCategory {
  id: number;
  name: string;
  key: string;
}

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  vegetarian: boolean;
  spiciness: number;
  rate: number;
  price: number;
  image: string;
  method: string;
  ingredients: string[];
  categoryId: number;
  category?: ProductCategory;
}
