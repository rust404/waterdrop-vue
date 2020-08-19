import {Category, IndexedMoneyRecord, MoneyRecord} from "@/store/modules/module-types";
import dayjs from "dayjs";

function getRecordsByMonth(records: MoneyRecord[], time: Date) {
  return records.filter(record => {
    return dayjs(time).isSame(record.createAt, 'month')
  })
}

function getRecordsByYear(records: MoneyRecord[], time: Date) {
  return records.filter(record => {
    return dayjs(time).isSame(record.createAt, 'year')
  })
}

function getRecords(records: IndexedMoneyRecord[], option: Partial<IndexedMoneyRecord>) {
  return records.filter(record => {
    for (const key in option) {
      if (!Object.prototype.hasOwnProperty.call(option, key)) continue
      if (record[key] !== option[key]) return false
    }
    return true
  })
}
function getCategoryById(categories: Category[], id: number) {
  return categories.filter(category => category.id === id)[0]
}


export {
  getRecordsByMonth,
  getRecordsByYear,
  getCategoryById,
  getRecords,
}