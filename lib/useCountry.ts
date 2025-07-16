import { useQuery } from "@tanstack/react-query";

export interface VariantFreqs { [variant: string]: number }
export interface CountryData { [week: string]: VariantFreqs }

export function useCountry(code: string) {
  return useQuery<CountryData>({
    queryKey: ["country", code],
    queryFn: async () => {
      const res = await fetch("/per_country.json");
      const all = (await res.json()) as Record<string, CountryData>;
      return all[code.toUpperCase()] ?? {};
    }
  });
}
