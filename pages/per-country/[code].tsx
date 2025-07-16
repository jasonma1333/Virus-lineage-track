import { useRouter } from "next/router";
import { useCountry } from "@/lib/useCountry";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function CountryPage() {
  const { query } = useRouter();
  const code = String(query.code || "").toUpperCase();
  const { data, isLoading } = useCountry(code);

  if (!code) return <p>Invalid code</p>;
  if (isLoading) return <p>Loading…</p>;
  if (!data || Object.keys(data).length === 0)
    return <p>No data for {code}</p>;

  // 轉為 Recharts 需要的 array
  const chartData = Object.entries(data).map(([week, freqs]) => ({
    week, ...freqs
  }));
  const variants = Object.keys(chartData[0]).filter(k => k !== "week");

  return (
    <main className="p-4 prose">
      <h1>{code} &mdash; SARS‑CoV‑2 variants</h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData} stackOffset="expand">
          <XAxis dataKey="week" minTickGap={20} />
          <YAxis tickFormatter={v => `${(v * 100).toFixed(0)}%`} />
          <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} />
          {variants.map(v => (
            <Area
              key={v}
              type="monotone"
              dataKey={v}
              stackId="1"
              strokeWidth={1}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </main>
  );
}
