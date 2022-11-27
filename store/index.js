export const state = () => ({
  menu_visible: true,
});

export const getters = {
  getMenuVisible(state) {
    return state.menu_visible;
  },
};

export const mutations = {
  setMenuVisible(state, data) {
    state.menu_visible = data;
  },
};

export const actions = {};
