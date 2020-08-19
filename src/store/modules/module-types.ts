export interface Category {
  name: string;
  icon: string;
  id: number;
  moneyType: MoneyType;
}

export type MoneyType = "income" | "expenditure";

export interface MoneyRecord {
  createAt: string;
  moneyType: MoneyType;
  categoryId: number;
  id: number;
  amount: number;
}

export interface IndexedMoneyRecord extends MoneyRecord {
  [index: string]: any;
}

export interface CategoryState {
  categoryList: Category[];
}

export interface MoneyRecordState {
  recordList: MoneyRecord[];
}
