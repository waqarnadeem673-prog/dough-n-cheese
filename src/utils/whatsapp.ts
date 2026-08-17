import type { Product, Branch } from '@/types';

type OrderSelection = {
  quantity: number;
  priceLabel?: string;
  price: number;
  variantSelections?: Record<string, string>;
};

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

export function generateWhatsAppOrder(
  product: Product,
  selection: OrderSelection,
  branch: Branch,
): string {
  const lines: string[] = [
    `Hi Dough N Cheese!`,
    `I would like to order:`,
    `Product: ${product.name} × ${selection.quantity}`,
    `Total: ${formatPrice(selection.price * selection.quantity)}`,
    `Branch: ${branch.name}`,
    ``,
    `Please confirm my order.`,
  ];

  const message = lines.join('\n');
  const encoded = encodeURIComponent(message);

  return `https://wa.me/${branch.whatsapp}?text=${encoded}`;
}

export function openWhatsApp(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}
