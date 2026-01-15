import { create } from "zustand";

const useGroupStore = create((set) => ({
  groups: JSON.parse(localStorage.getItem("groups") || "[]"),
  expenses: JSON.parse(localStorage.getItem("expenses") || "{}"),

  addGroup: (group) =>
    set((state) => {
      const newGroups = [...state.groups, group];
      const newExpenses = { ...state.expenses, [group.id]: [] };

      localStorage.setItem("groups", JSON.stringify(newGroups));
      localStorage.setItem("expenses", JSON.stringify(newExpenses));

      return { groups: newGroups, expenses: newExpenses };
    }),

  addExpense: (groupId, expense) =>
    set((state) => {
      const newExpenses = {
        ...state.expenses,
        [groupId]: [...(state.expenses[groupId] || []), expense],
      };

      localStorage.setItem("expenses", JSON.stringify(newExpenses));

      return { expenses: newExpenses };
    }),
}));

export default useGroupStore;
