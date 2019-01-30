import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        shopdetailList:'',
        username:'',
    },
    mutations:{
        setVal(state,shopListval) {
            state.shopdetailList = shopListval;
        },
        setUserName(state,val) {
            state.username = val;
        }
    },
    actions:{

    }
})