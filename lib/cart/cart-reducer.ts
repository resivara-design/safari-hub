export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  imagePlaceholder: { colorFrom: string; colorTo: string; icon: string };
  photo?: string;
}

export type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "REMOVE_ITEM"; slug: string }
  | { type: "UPDATE_QUANTITY"; slug: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; items: CartItem[] };

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const quantity = action.quantity ?? 1;
      const existing = state.items.find((i) => i.slug === action.item.slug);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.slug === action.item.slug
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.item, quantity }],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.slug !== action.slug) };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.slug !== action.slug) };
      }
      return {
        items: state.items.map((i) =>
          i.slug === action.slug ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}
