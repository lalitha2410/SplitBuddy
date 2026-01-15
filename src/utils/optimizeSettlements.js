export function optimizeSettlements(balances) {
  const creditors = [];
  const debtors = [];

  Object.entries(balances).forEach(([member, amount]) => {
    if (amount > 0) {
      creditors.push({ member, amount });
    } else if (amount < 0) {
      debtors.push({ member, amount: -amount }); // store as positive
    }
  });

  const settlements = [];

  let i = 0;
  let j = 0;

  while (i < creditors.length && j < debtors.length) {
    const credit = creditors[i];
    const debit = debtors[j];

    const settled = Math.min(credit.amount, debit.amount);

    settlements.push({
      from: debit.member,
      to: credit.member,
      amount: settled,
    });

    credit.amount -= settled;
    debit.amount -= settled;

    if (credit.amount === 0) i++;
    if (debit.amount === 0) j++;
  }

  return settlements;
}
