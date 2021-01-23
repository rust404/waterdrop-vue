import {MutationTree, Module, ActionTree, GetterTree} from "vuex";
import {generateId, getKeyByPrefix, getRecords, getRecordsByTime} from "@/store/utils";
import dayjs from "dayjs";
import {PREFIX} from "@/store/constants";

export const RECORD_KEY = getKeyByPrefix(PREFIX, 'records')

const defaultRecordList: MoneyRecord[] = []
const mutations: MutationTree<MoneyRecordState> = {
  add(state, payload: Omit<MoneyRecord, "id">) {
    state.recordList.push({
      id: generateId(),
      ...payload,
    });
  },
  delete(state, id: string) {
    state.recordList = state.recordList.filter((record) => {
      return record.id !== id;
    });
  },
  edit(
    state,
    payload: Pick<MoneyRecord, "id"> & Partial<Omit<MoneyRecord, "id">>
  ) {
    const record = getRecords(state.recordList, {
      id: payload.id
    })[0]
    if (record) {
      const index = state.recordList.indexOf(record);
      state.recordList.splice(index, 1, {
        ...record,
        ...payload,
      });
    }
  },
};
const actions: ActionTree<MoneyRecordState, {}> = {
  add({commit, dispatch}, payload: Omit<MoneyRecord, "id">) {
    commit('add', payload)
  },
  edit({commit, dispatch}, payload: Pick<MoneyRecord, "id"> & Partial<Omit<MoneyRecord, "id">>) {
    commit('edit', payload)
  },
  delete({dispatch, commit}, id: number) {
    commit('delete', id)
  }
}

const loadRecords = () => {
  const item = window.localStorage.getItem(RECORD_KEY)
  const list: MoneyRecord[] = item ? JSON.parse(item) : defaultRecordList
  return {
    recordList: list
  }
}

export const saveRecords = (state: MoneyRecord[]) => {
  window.localStorage.setItem(RECORD_KEY, JSON.stringify(state))
}
const getters: GetterTree<MoneyRecordState, {}> = {
  getRecords: state => (option: Partial<IndexedMoneyRecord>) => {
    return getRecords(state.recordList, option)
  },
  getRecordsByMonth: state => (time: Date) => {
    return getRecordsByTime(state.recordList, time, 'month')
  },
  getRecordsByYear: state => (time: Date) => {
    return getRecordsByTime(state.recordList, time, 'year')
  },
  getRecordsByTime: state => (time: Date, unit: dayjs.UnitType) => {
    return getRecordsByTime(state.recordList, time, unit)
  }
}

export const record: Module<MoneyRecordState, RootState> = {
  namespaced: true,
  state: loadRecords,
  mutations,
  actions,
  getters,
};
