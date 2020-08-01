export interface Catagory {
  name: string;
  icon: string;
  id: number;
  moneyType: MoneyType;
}

export type MoneyType = "income" | "expenditure";

export interface MoneyRecord {
  time: string;
  moneyType: MoneyType;
  catagoryId: number;
  id: number;
  amount: number;
}

export interface CatagoryState {
  catagoryList: Catagory[];
}

export interface MoneyRecordState {
  recordList: MoneyRecord[];
}
