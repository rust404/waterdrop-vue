import {MoneyRecord, MoneyRecordState} from "./module-types";
import {MutationTree, Module} from "vuex";

const state: MoneyRecordState = {
    recordList:
        [{
            "id": 1597570392176,
            "moneyType": "expenditure",
            "categoryId": 1,
            "amount": 99,
            "time": "2020-08-16T09:33:05.620Z"
        }, {
            "id": 1597570405155,
            "moneyType": "income",
            "categoryId": 3,
            "amount": 99,
            "time": "2020-08-16T09:33:05.620Z"
        }, {
            "id": 1597570405178,
            "moneyType": "income",
            "categoryId": 3,
            "amount": 89,
            "time": "2020-08-14T09:33:05.620Z"
        }]
    ,
};

const mutations: MutationTree<MoneyRecordState> = {
    add(state, payload: Omit<MoneyRecord, "id">) {
        state.recordList.push({
            id: +new Date(),
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
