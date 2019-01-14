/*
** This file is what is pointed to for building bundle
** to export as node module
*/
import Vue from 'vue';
import FormStackForm from './components/FormStackForm.vue';

const Components = {
  FormStackForm,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
