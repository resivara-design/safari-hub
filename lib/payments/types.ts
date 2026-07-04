export interface CheckoutCustomer {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
}

export interface CheckoutItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CheckoutPayload {
  customer: CheckoutCustomer;
  items: CheckoutItem[];
  subtotal: number;
}

export interface CheckoutResult {
  success: boolean;
  orderId: string;
  message: string;
}

export type PaymentProvider = (payload: CheckoutPayload) => Promise<CheckoutResult>;
