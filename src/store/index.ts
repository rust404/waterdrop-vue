import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import {category, saveCategories} from "./modules/category";
import {record, saveRecords} from "./modules/record";

Vue.use(Vuex);

const storeConfig: StoreOptions<RootState> = {
  modules: {
    category,
    record,
  },
};

const store = new Vuex.Store(storeConfig);

store.subscribe((mutation, state) => {
  console.log(mutation, state)
  saveRecords(state.record.recordList)
  saveCategories(state.category.categoryList)
})

export default store
