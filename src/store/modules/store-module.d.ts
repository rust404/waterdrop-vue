interface Category {
  name: string;
  icon: string;
  id: string;
  moneyType: MoneyType;
}

interface IndexedCategory extends Category {
  [index: string]: any;
}

type MoneyType = "income" | "expenditure";

interface MoneyRecord {
  createAt: string;
  moneyType: MoneyType;
  categoryId: string;
  id: string;
  amount: number;
}

interface IndexedMoneyRecord extends MoneyRecord {
  [index: string]: any;
}

interface CategoryState {
  categoryList: Category[];
}

interface MoneyRecordState {
  recordList: MoneyRecord[];
}

type RootState = {
  category: CategoryState;
  record: MoneyRecordState;
}

