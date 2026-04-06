export type CartItemKind = "service" | "product";

export type CartItem = {
  id: string;
  name: string;
  priceDkk: number;
  quantity: number;
  image?: string;
  stripePriceId?: string;
  kind: CartItemKind;
  category?: string;
  relatedIds?: string[];
};
