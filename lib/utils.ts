export function formatPrice(price: number) {
  return `${price.toLocaleString("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} kr`;
}