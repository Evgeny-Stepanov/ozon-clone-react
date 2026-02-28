export const toRub = (price: number, rate: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: false,
  }).format(price * rate);
