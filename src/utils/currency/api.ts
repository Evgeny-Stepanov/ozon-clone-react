interface CurrencyInfo {
  CharCode: string;
  Value: number;
}

interface CbrResponse {
  Valute: Record<string, CurrencyInfo>;
}

export const getExchangeRates = async (): Promise<Record<
  string,
  CurrencyInfo
> | null> => {
  try {
    const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');

    if (!res.ok)
      throw new Error(
        `Ошибка получения курса валют: ${res.status} ${res.statusText}`,
      );

    const data = (await res.json()) as CbrResponse;
    const currentRate = data.Valute;

    return currentRate;
  } catch (error) {
    console.error('Ошибка получение курса валют:', error);
    return null;
  }
};
