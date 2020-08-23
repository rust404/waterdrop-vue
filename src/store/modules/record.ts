import {MoneyRecord, MoneyRecordState} from "./module-types";
import {MutationTree, Module, ActionTree} from "vuex";
import {generateRecordId, saveMaxRecordId} from "@/store/utils/generateRecordId";
import {getRecords} from "@/store/utils";

const state: MoneyRecordState = {
  recordList: [],
};

const defaultRecordList: Omit<MoneyRecord, 'id'>[] = [
  {
    "moneyType": "expenditure",
    "categoryId": 1,
    "amount": 99,
    "createAt": "2020-08-11T09:33:05.620Z"
  },
  {
    "moneyType": "expenditure",
    "categoryId": 6,
    "amount": 34,
    "createAt": "2020-08-16T09:33:05.620Z"
  },
  {
    "moneyType": "expenditure",
    "categoryId": 5,
    "amount": 99,
    "createAt": "2020-08-10T09:33:05.620Z"
  },
  {
    "moneyType": "expenditure",
    "categoryId": 4,
    "amount": 20,
    "createAt": "2020-08-10T09:33:05.620Z"
  },
  {
    "moneyType": "income",
    "categoryId": 3,
    "amount": 99,
    "createAt": "2020-08-13T09:33:05.620Z"
  },
  {
    "moneyType": "income",
    "categoryId": 3,
    "amount": 88,
    "createAt": "2020-08-14T09:33:05.620Z"
  }
]
const mutations: MutationTree<MoneyRecordState> = {
  add(state, payload: Omit<MoneyRecord, "id">) {
    state.recordList.push({
      id: generateRecordId(),
      ...payload,
    });
  },
  delete(state, id: number) {
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
    saveMaxRecordId()
    dispatch('save')
  },
  edit({commit, dispatch}, payload: Pick<MoneyRecord, "id"> & Partial<Omit<MoneyRecord, "id">>) {
    commit('edit', payload)
    dispatch('save')
  },
  delete({dispatch, commit}, id: number) {
    commit('delete', id)
    dispatch('save')
  },
  save({state}) {
    window.localStorage.setItem('records', JSON.stringify(state.recordList))
  },
  load({state, dispatch}) {
    const list = JSON.parse(window.localStorage.getItem('records') || '[]')
    if (list.length > 0) {
      state.recordList = list
      return
    }
    defaultRecordList.forEach(({moneyType, categoryId, amount, createAt}) => {
      dispatch('add', {
        moneyType,
        categoryId,
        amount,
        createAt
      })
    })
  }
}

export const record: Module<MoneyRecordState, {}> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
