import {MutationTree, Module, ActionTree, GetterTree} from "vuex";
import {generateId, getCategories, getCategoryById, getKeyByPrefix} from "@/store/utils";
import {PREFIX} from "@/store/constants";

export const CATEGORY_KEY = getKeyByPrefix(PREFIX, 'categories')
const defaultCategoryList: Category[] = [
  {name: "餐饮", icon: "canyin", moneyType: "expenditure", id: "1612b088-3730-429d-ada1-32d726c0593c"},
  {name: "服饰", icon: "fushi", moneyType: "expenditure", id: "ee47c60e-7d7d-4f77-8ea4-aaaed7749631"},
  {name: "读书", icon: "dushu", moneyType: "expenditure", id: "949f55ef-0f57-4bc7-b5bd-93be277d06e4"},
  {name: "交通", icon: "jiaotong", moneyType: "expenditure", id: "8c834353-b727-4039-8e5a-a196058f83db"},
  {name: "旅行", icon: "lvxing", moneyType: "expenditure", id: "ae684aa2-3302-47c0-b1f8-6eeeec5580d3"},
  {name: "日用", icon: "riyongpin", moneyType: "expenditure", id: "05b6a0f9-1e80-4d60-8c59-2ae7ecdcfe3c"},
  {name: "工资", icon: "gongzi", moneyType: "income", id: "1de75225-cf7c-4c34-88aa-ec2591d33909"},
  {name: "兼职", icon: "jianzhi", moneyType: "income", id: "5c04d58b-5112-4f2f-8b90-975833f41cc2"},
  {name: "理财", icon: "licai", moneyType: "income", id: "c6d471fe-4a33-46ac-9e41-f94960abfec2"}
]

const mutations: MutationTree<CategoryState> = {
  add(state, payload: Omit<Category, "id">) {
    state.categoryList.push({
      id: generateId(),
      ...payload,
    });
  },
  delete(state, id: string) {
    state.categoryList = state.categoryList.filter((category) => {
      return category.id !== id;
    });
  },
  edit(state, payload: Pick<Category, "id"> & Partial<Omit<Category, "id">>) {
    const category = getCategoryById(state.categoryList, payload.id)
    if (category) {
      const index = state.categoryList.indexOf(category);
      state.categoryList.splice(index, 1, {
        ...category,
        ...payload,
      });
    }
  }
};
const actions: ActionTree<CategoryState, {}> = {
  add({state, commit, dispatch}, payload: Omit<Category, "id">) {
    commit('add', payload)
  },
  edit({commit, dispatch}, payload: Pick<Category, "id"> & Partial<Omit<Category, "id">>) {
    commit('edit', payload)
  },
  delete({commit, dispatch}, id: number) {
    commit('delete', id)
  }
}

const loadCategories = () => {
  const item = window.localStorage.getItem(CATEGORY_KEY)
  const list: Category[] = item ? JSON.parse(item) : defaultCategoryList
  return {
    categoryList: list
  }
}

export const saveCategories = (state: Category[]) => {
  window.localStorage.setItem(CATEGORY_KEY, JSON.stringify(state))
}

const getters: GetterTree<CategoryState, {}> = {
  getCategoryById: state => (id: string) => {
    return getCategoryById(state.categoryList, id)
  },
  getCategories: state => (option: Partial<IndexedCategory>) => {
    return getCategories(state.categoryList, option)
  },
  getCategoryIcon: (state, getters) => (id: number) => {
    const category = getters.getCategoryById(id)
    return category ? category.icon : ''
  },
  getCategoryName: (state, getters) => (id: number) => {
    const category = getters.getCategoryById(id)
    return category ? category.name : ''
  }
}

export const category: Module<CategoryState, RootState> = {
  namespaced: true,
  state: loadCategories,
  mutations,
  actions,
  getters,
};
