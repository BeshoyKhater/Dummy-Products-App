import axios from "axios";
import type { Category, Product, ProductsResponse } from "../types/product";

const API = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 15000,
});

export async function fetchProducts(params: {
  limit: number;
  skip: number;
}): Promise<ProductsResponse> {
  const { data } = await API.get<ProductsResponse>("/products", { params });
  return data;
}

export async function searchProducts(params: {
  q: string;
  limit: number;
  skip: number;
}): Promise<ProductsResponse> {
  const { data } = await API.get<ProductsResponse>("/products/search", {
    params,
  });
  return data;
}

export async function fetchProductsByCategory(
  category: string,
  params: { limit: number; skip: number }
): Promise<ProductsResponse> {
  const { data } = await API.get<ProductsResponse>(
    `/products/category/${encodeURIComponent(category)}`,
    { params }
  );
  return data;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await API.get<Category[]>("/products/categories");
  return data;
}

export async function fetchAllProducts(
  category?: string
): Promise<ProductsResponse> {
  const pageSize = 100;
  let skip = 0;
  let all: Product[] = [];
  let total = 0;

  while (true) {
    const resp = category
      ? await fetchProductsByCategory(category, { limit: pageSize, skip })
      : await fetchProducts({ limit: pageSize, skip });

    all = all.concat(resp.products);
    total = resp.total;
    skip += pageSize;

    if (all.length >= total) break;
  }

  return { products: all, total: all.length, skip: 0, limit: all.length };
}
