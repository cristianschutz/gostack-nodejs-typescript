import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    transactions.map(item => {
      if (item.type === 'income') {
        balance.income += item.value;
      }

      if (item.type === 'outcome') {
        balance.outcome += item.value;
      }

      return item;
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
