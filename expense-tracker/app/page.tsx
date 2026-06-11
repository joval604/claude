import StatCard from "./components/StatCard";
import PLChart from "./components/PLChart";
import ExpenseBreakdown from "./components/ExpenseBreakdown";
import TransactionList from "./components/TransactionList";
import { transactions } from "./data/mock";

function computeStats() {
  const thisMonth = "2026-06";
  const monthTx = transactions.filter((t) => t.date.startsWith(thisMonth));

  const income = monthTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = monthTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const net = income - expenses;

  const pinIncome = monthTx
    .filter((t) => t.type === "income" && t.productLine === "pins")
    .reduce((s, t) => s + t.amount, 0);
  const apparelIncome = monthTx
    .filter((t) => t.type === "income" && t.productLine === "apparel")
    .reduce((s, t) => s + t.amount, 0);

  return { income, expenses, net, pinIncome, apparelIncome };
}

export default function Dashboard() {
  const { income, expenses, net, pinIncome, apparelIncome } = computeStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">Pins &amp; Apparel — June 2026</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Monthly Income" value={`$${income.toFixed(2)}`} positive />
          <StatCard label="Monthly Expenses" value={`$${expenses.toFixed(2)}`} negative />
          <StatCard
            label="Net Profit"
            value={`$${net.toFixed(2)}`}
            positive={net > 0}
            negative={net < 0}
            sub={`${((net / income) * 100).toFixed(0)}% margin`}
          />
          <StatCard
            label="By Product"
            value={`$${pinIncome.toFixed(0)} / $${apparelIncome.toFixed(0)}`}
            sub="Pins / Apparel"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PLChart />
          <ExpenseBreakdown />
        </div>

        <TransactionList />
      </div>
    </div>
  );
}
