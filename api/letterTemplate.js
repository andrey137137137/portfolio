import Vue from 'vue';
import App from './letterTemplate.vue';

// экспортируем функцию фабрику для создания экземпляров
// нового приложения, маршрутизатора и хранилища
export function createApp(context) {
  const app = new Vue({
    data: {
      item: context.item,
    },
    // корневой экземпляр просто рендерит компонент App
    render: h => h(App),
  });
  return { app };
}

export default context => {
  const { app } = createApp(context);
  return app;
};
