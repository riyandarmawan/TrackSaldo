import { Transaction } from "@/lib/types";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TransactionChartProps = {
  transactionData: Transaction[];
};

const chartConfig = {
  income: {
    label: "Income",
    color: "#22c55e", // green-500
  },
  expense: {
    label: "Expense",
    color: "#ef4444", // red-500
  },
} satisfies ChartConfig;

type DailySummary = {
  date: string;
  income: number;
  expense: number;
};

export function TransactionChart({ transactionData }: TransactionChartProps) {
  const summaryMap: Record<string, DailySummary> = {};

  transactionData.forEach((tx) => {
    const date = new Date(tx.date).toISOString().split("T")[0];
    if (!summaryMap[date]) {
      summaryMap[date] = { date, income: 0, expense: 0 };
    }
    if (tx.type === "income") {
      summaryMap[date].income += tx.amount;
    } else {
      summaryMap[date].expense += tx.amount;
    }
  });

  const summarizedData: DailySummary[] = Object.values(summaryMap).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={summarizedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent payload={summarizedData}/>} />
          <Line
            type="monotone"
            dataKey="income"
            stroke={chartConfig.income.color}
            name={chartConfig.income.label}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke={chartConfig.expense.color}
            name={chartConfig.expense.label}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
