const rubFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  useGrouping: false,
});

export const toRub = (amount: number) => rubFormatter.format(amount);
