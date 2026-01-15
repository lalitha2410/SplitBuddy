import { useParams, useNavigate } from "react-router-dom";
import useGroupStore from "../store/useGroupStore";
import { motion } from "framer-motion";

export default function GroupDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const groups = useGroupStore((s) => s.groups);
  const expenses = useGroupStore((s) => s.expenses[id] || []);

  const group = groups.find((g) => g.id === id);
  if (!group) return <div>Group not found</div>;

  // ----- BALANCE CALCULATION -----
  const balances = {};
  group.members.forEach((m) => (balances[m] = 0));

  expenses.forEach((e) => {
    const share = e.amount / e.splitBetween.length;
    balances[e.paidBy] += e.amount;
    e.splitBetween.forEach((m) => (balances[m] -= share));
  });

  // ----- SETTLEMENTS CALCULATION -----
  const settlements = [];
  const creditors = [];
  const debtors = [];

  Object.entries(balances).forEach(([m, v]) => {
    if (v > 0) creditors.push({ name: m, amount: v });
    if (v < 0) debtors.push({ name: m, amount: -v });
  });

  let ci = 0,
    di = 0;

  while (ci < creditors.length && di < debtors.length) {
    const payAmount = Math.min(creditors[ci].amount, debtors[di].amount);
    settlements.push({
      from: debtors[di].name,
      to: creditors[ci].name,
      amount: payAmount,
    });

    creditors[ci].amount -= payAmount;
    debtors[di].amount -= payAmount;

    if (creditors[ci].amount === 0) ci++;
    if (debtors[di].amount === 0) di++;
  }

  return (
    <div className="hero-center pt-28 bg-[#EEF8F1] min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: "auto" }}
        className="
          bg-white/70 backdrop-blur-lg 
          border border-[#0F3D2E]/15 shadow-lg rounded-2xl
          max-w-xl w-full p-8 space-y-6
        "
      >
        <h2 className="text-2xl font-bold text-center text-[#0F3D2E]">
          {group.name}
        </h2>

        <button
          onClick={() => navigate(`/group/${id}/add-expense`)}
          className="w-full py-2 bg-[#0F3D2E] text-white rounded-xl hover:bg-[#0D3328] transition font-medium"
        >
          + Add Expense
        </button>

        {/* BALANCES */}
        <h3 className="text-xl font-semibold text-[#0F3D2E]">Balances</h3>

        {expenses.length === 0 ? (
          <p className="text-[#0F3D2E]/70">No expenses yet.</p>
        ) : (
          Object.entries(balances).map(([m, v]) => (
            <p
              key={m}
              className={`${
                v > 0
                  ? "text-[#1C7C54]"
                  : v < 0
                  ? "text-[#D64545]"
                  : "text-[#0F3D2E]/60"
              }`}
            >
              {m}:{" "}
              {v === 0
                ? "settled"
                : v > 0
                ? `gets ₹${v.toFixed(2)}`
                : `owes ₹${(-v).toFixed(2)}`}
            </p>
          ))
        )}

        {/* SETTLEMENTS */}
        <h3 className="text-xl font-semibold text-[#0F3D2E]">Settlements</h3>

        {expenses.length === 0 ? (
          <p className="text-[#0F3D2E]/70">No settlements yet.</p>
        ) : settlements.length === 0 ? (
          <p className="text-[#1C7C54]">All settled 🎉</p>
        ) : (
          settlements.map((s, i) => (
            <p key={i} className="text-[#0F3D2E]">
              {s.from} → {s.to}: ₹{s.amount.toFixed(2)}
            </p>
          ))
        )}

        {/* EXPENSE LIST */}
        <h3 className="text-xl font-semibold text-[#0F3D2E]">Expenses</h3>

        {expenses.length === 0 ? (
          <p className="text-[#0F3D2E]/70">No expenses yet.</p>
        ) : (
          expenses.map((e) => (
            <div
              key={e.id}
              className="p-3 rounded-xl border border-[#0F3D2E]/15 bg-white/60 backdrop-blur-sm"
            >
              <p className="font-medium text-[#0F3D2E]">{e.desc}</p>
              <p className="text-[#0F3D2E]/80 text-sm">
                ₹{e.amount} • paid by {e.paidBy}
              </p>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}
