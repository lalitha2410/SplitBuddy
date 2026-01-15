export function calculateBalances(expenses, members) {
  const balances = {};

  // init all members to 0
  members.forEach((m) => {
    balances[m] = 0;
  });

  expenses.forEach((e) => {
    const splitAmount = e.amount / e.splitBetween.length;

    // person who paid gets credit
    balances[e.paidBy] += e.amount;

    // people who owe reduce their balance
    e.splitBetween.forEach((member) => {
      balances[member] -= splitAmount;
    });
  });

  return balances;
}
