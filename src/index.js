import { extract } from '@extractus/article-extractor';

const url = 'https://www.bcv.org.ve/';
const divisasRegex = /<strong>([\s+\d,.]+)<\/strong>/g;

/**
 * Retrieves the current rates for different currencies.
 * @returns {Promise<{EUR: number, CNY: number, TRY: number, RUB: number, USD: number}>} The current rates for EUR, CNY, TRY, RUB, and USD.
 */
export async function getCurrentRates() {
  const { content } = await extract(url);

  const divisasMatch = content.match(divisasRegex);
  const divisas = divisasMatch.map((match) => {
    const result = match
      .replace(/<strong>|<\/strong>/g, '')
      .replace(/,/, '.')
      .trim();

    return parseFloat(result);
  });
  const [EUR, CNY, TRY, RUB, USD] = divisas;

  return {
    EUR,
    CNY,
    TRY,
    RUB,
    USD,
  };
}
