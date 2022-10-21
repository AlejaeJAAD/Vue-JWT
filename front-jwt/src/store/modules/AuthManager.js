import Axios from 'axios';

const state = {
  token: localStorage.x_jwt_string
};

const getters = {
  getToken(state) {
    return state.token
  },
  getUser(state) {
    return state.user;
  },
  isLogged(state) {
    return state.token !== "";
  }
};

const mutations = {
  clearAuthData(state) {
    state.token = null;
  },
  setToken(state, payload) {
    state.token = payload
  }
};

const actions = {
  login(context, loginForm) {
    return new Promise((response, error) => {
      //Axios.post('http://localhost:3001/api/user/login', loginForm)
      Axios.post('https://alejae-vue-jwt.herokuapp.com/api/user/login', loginForm)
        .then(res => {
          if (res.data.error) {
            error(res.data.error);
            return;
          }
          context.commit('setToken', res.data.data.token)
          response(res.data);
          localStorage.setItem("x_jwt_string", res.data.data.token)
          const token = localStorage.x_jwt_string;
          console.log('Metodo login y su token', token)
        })
        .catch(() => error(new Error("Algo salió mal!")));
    });
  },
  obtenerToken({ commit }) {
    const token = localStorage.x_jwt_string;
    console.log('Metodo obtener token y su token', token)
    if (token) {
      commit('setToken', token)
    } else {
      commit('setToken', null)
    }
  },
  cerrarSesion(context) {
    context.commit("clearAuthData");
    localStorage.removeItem('x_jwt_string')
    localStorage.removeItem("x_jwt_userId");
    console.log(state.token)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};