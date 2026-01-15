import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useGroupStore from "../store/useGroupStore";

export default function AddExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const groups = useGroupStore((s) => s.groups);
  const addExpense = useGroupStore((s) => s.addExpense);

  const group = groups.find((g) => g.id === id);
  if (!group) return <div>Group not found</div>;

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitBetween, setSplitBetween] = useState([]);

  const toggleSplit = (member) => {
    setSplitBetween((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleSubmit = () => {
    if (!desc.trim()) return alert("Enter description");
    if (!amount) return alert("Enter amount");
    if (!paidBy) return alert("Select payer");
    if (splitBetween.length === 0) return alert("Select split participants");

    addExpense(id, {
      id: crypto.randomUUID(),
      desc,
      amount: Number(amount),
      paidBy,
      splitBetween,
      date: new Date().toISOString(),
    });

    navigate(`/group/${id}`);
  };

  return (
    <div className="hero-center pt-28 bg-[#EEF8F1]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: "auto" }}
        className="
          bg-white/70 backdrop-blur-lg 
          border border-[#0F3D2E]/15 shadow-lg rounded-2xl
          max-w-lg w-full p-8 space-y-6
        "
      >
        <h2 className="text-2xl font-bold text-center text-[#0F3D2E]">
          Add Expense
        </h2>

        <input
          className="w-full p-2 rounded-xl border border-[#0F3D2E]/20 outline-none"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          className="w-full p-2 rounded-xl border border-[#0F3D2E]/20 outline-none"
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="w-full p-2 rounded-xl border border-[#0F3D2E]/20 outline-none"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        >
          <option value="">Paid by</option>
          {group.members.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <div className="space-y-1">
          <p className="text-sm text-[#0F3D2E]/80 font-medium">Split Between:</p>
          {group.members.map((m) => (
            <label key={m} className="flex gap-2 items-center text-[#0F3D2E]">
              <input
                type="checkbox"
                checked={splitBetween.includes(m)}
                onChange={() => toggleSplit(m)}
              />
              {m}
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-[#0F3D2E] text-white rounded-xl hover:bg-[#0D3328] transition font-medium"
        >
          Add Expense
        </button>
      </motion.div>
    </div>
  );
}
