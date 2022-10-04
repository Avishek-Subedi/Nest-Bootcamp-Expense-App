import { v4 } from 'uuid';
export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const dataBase: Data = {
  report: [
    {
      id: 'uuid1',
      amount: 65656,
      created_at: new Date(),
      updated_at: new Date(),
      source: 'stealing',
      type: ReportType.INCOME,
    },
    {
      id: 'uuid2',
      amount: 56,
      created_at: new Date(),
      updated_at: new Date(),
      source: 'bank stealing',
      type: ReportType.EXPENSE,
    },
    {
      id: 'uuid3',
      amount: 6,
      created_at: new Date(),
      updated_at: new Date(),
      source: 'stealing',
      type: ReportType.EXPENSE,
    },
    {
      id: 'uuid4',
      amount: 99,
      created_at: new Date(),
      updated_at: new Date(),
      source: 'Coding',
      type: ReportType.EXPENSE,
    },
  ],
};

dataBase.report.push({
  id: 'uuid',
  source: 'income',
  amount: 7500,
  created_at: new Date(),
  updated_at: new Date(),
  type: ReportType.INCOME,
});

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}
