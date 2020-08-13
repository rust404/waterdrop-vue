import { Category, CategoryState } from "./module-types";
import { MutationTree, Module } from "vuex";

const state: CategoryState = {
  categoryList: [
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

const mutations: MutationTree<CategoryState> = {
  add(state, payload: Omit<Category, "id">) {
    state.categoryList.push({
      id: +new Date(),
      ...payload,
    });
  },
  delete(state, id: number) {
    state.categoryList = state.categoryList.filter((category) => {
      return category.id !== id;
    });
  },
  edit(state, payload: Pick<Category, "id"> & Partial<Omit<Category, "id">>) {
    const category = state.categoryList.filter(
      (item) => item.id == payload.id
    )[0];
    if (category) {
      const index = state.categoryList.indexOf(category);
      state.categoryList.splice(index, 1, {
        ...category,
        ...payload,
      });
    }
  },
};

export const category: Module<CategoryState, {}> = {
  namespaced: true,
  state,
  mutations,
};
