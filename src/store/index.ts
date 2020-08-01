import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { catagory } from "./modules/catagory";
import { record } from "./modules/record";

Vue.use(Vuex);

const store: StoreOptions<{}> = {
  state: {},
  modules: {
    catagory,
    record,
  },
};

export default new Vuex.Store(store);
