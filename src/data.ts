// Purpose: To store the data in the application
interface Data {
  report: {
    id: number;
    source: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    // type: 'income' | 'expense'; // This is the one way of doing
    type: ReportType;
  }[];
}
export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
 export const data: Data = {
  report: [
    {
      id: 1,
      source: 'Salary',
      amount: 100000,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 2,
      source: 'Youtube',
      amount: 10000,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 3,
      source: 'Gaming',
      amount: 8000,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.EXPENSE,
    },
    {
      id: 4,
      source: 'Food',
      amount: 29000,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.EXPENSE,
    }
  ],
};

// data.report.push({
//   id: 1,
//   source: 'Salary',
//   amount: 100000,
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   type: ReportType.INCOME,
// });
