import { Catagory, CatagoryState } from "./module-types";
import { MutationTree, Module } from "vuex";

const state: CatagoryState = {
  catagoryList: [
    {
      name: "餐饮",
      icon: "canyin",
      id: 1,
      moneyType: "expenditure",
    },
    {
      name: "旅行",
      icon: "lvxing",
      id: 2,
      moneyType: "expenditure",
    },
  ],
};

const mutations: MutationTree<CatagoryState> = {
  add(state, payload: Omit<Catagory, "id">) {
    state.catagoryList.push({
      id: +new Date(),
      ...payload,
    });
  },
  delete(state, id: number) {
    state.catagoryList = state.catagoryList.filter((catagory) => {
      return catagory.id !== id;
    });
  },
  edit(state, payload: Pick<Catagory, "id"> & Partial<Omit<Catagory, "id">>) {
    const catagory = state.catagoryList.filter(
      (item) => item.id == payload.id
    )[0];
    if (catagory) {
      const index = state.catagoryList.indexOf(catagory);
      state.catagoryList.splice(index, 1, {
        ...catagory,
        ...payload,
      });
    }
  },
};

export const catagory: Module<CatagoryState, {}> = {
  namespaced: true,
  state,
  mutations,
};
