import Vue from 'vue';
import App from './letterTemplate.vue';

// экспортируем функцию фабрику для создания экземпляров
// нового приложения
export default context => {
  return new Vue({
    data: {
      item: context.item,
    },
    // корневой экземпляр просто рендерит компонент App
    render: h => h(App),
  });
};
