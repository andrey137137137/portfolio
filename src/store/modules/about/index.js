import axios from "axios";
import * as types from "@/store/common-mutation-types";

const dbPage = "skill";

export default {
  state: {
    data: []
  },
  getters: {
    skills(state) {
      return state.data;
    }
  },
  actions: {
    getSkills({ state }) {
      // fetch("/src/store/modules/about/data.json")
      //   .then(data => {
      //     return data.json();
      //   })
      //   .then(responce => {
      //     state.data = responce;
      //   });
      axios.get(dbPage).then(response => {
        state.data = response.data.skills;
      });
    },
    addSkill(state, skill) {
      state.data.push(skill);
    },
    removeSkill(state, skillId) {
      state.data = state.data.filter(item => item.id !== skillId);
    }
  },
  mutations: {
    [types.SET](state, data) {
      state.data = data;
    },
    [types.ADD](state, newItem) {
      state.data.push(newItem);
    },
    [types.DELETE](state, id) {
      state.data = state.data.filter(item => item.id !== id);
    }
  }
};
