import { MoneyRecord, MoneyRecordState } from "./module-types";
import { MutationTree, Module } from "vuex";

const state: MoneyRecordState = {
  recordList: [],
};

const mutations: MutationTree<MoneyRecordState> = {
  add(state, payload: Omit<MoneyRecord, "id" | "time">) {
    state.recordList.push({
      id: +new Date(),
      ...payload,
      time: new Date().toISOString(),
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
    const record = state.recordList.filter((item) => item.id == payload.id)[0];
    if (record) {
      const index = state.recordList.indexOf(record);
      state.recordList.splice(index, 1, {
        ...record,
        ...payload,
      });
    }
  },
};

export const record: Module<MoneyRecordState, {}> = {
  namespaced: true,
  state,
  mutations,
};
