import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        shopdetailList:''
    },
    mutations:{
        setVal(state,shopListval) {
            state.shopdetailList = shopListval;
        }
    },
    actions:{

    }
})