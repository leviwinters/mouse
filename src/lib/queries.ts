import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  image_url?: string;
  features?: string;
  created_at?: string;
}

export interface OrderItem {
  productName?: string;
  [key: string]: string | number | undefined;
}

export interface Order {
  id: number;
  created_at: string;
  total: number;
  items: OrderItem[] | string;
  user_id?: string;
}

export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: () => [...queryKeys.products.all, "list"] as const,
    detail: (id: string | number) => [...queryKeys.products.all, "detail", id] as const,
    bySlug: (slug: string) => [...queryKeys.products.all, "slug", slug] as const,
  },
  orders: {
    all: ["orders"] as const,
    byUser: (userId: string) => [...queryKeys.orders.all, userId] as const,
  },
};

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.list(),
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json() as Promise<Product[]>;
    },
  });
}

export function useProduct(id: string | number | undefined) {
  return useQuery({
    queryKey: queryKeys.products.detail(id!),
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json() as Promise<Product>;
    },
    enabled: !!id,
  });
}

export function useOrders(userId: string | null | undefined) {
  return useQuery({
    queryKey: queryKeys.orders.byUser(userId!),
    queryFn: async () => {
      const res = await fetch(`/api/orders?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      return (data.orders || []) as Order[];
    },
    enabled: !!userId,
  });
}

export function useInvalidateProducts() {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
  };
}

export function useInvalidateOrders(userId?: string) {
  const queryClient = useQueryClient();
  
  return () => {
    if (userId) {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.byUser(userId) });
    } else {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    }
  };
}
