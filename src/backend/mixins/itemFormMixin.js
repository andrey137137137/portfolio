import backFormMixin from '@backend/mixins/backFormMixin';
import { mapActions } from 'vuex';

export default {
  mixins: [backFormMixin],
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      removeTitle: 'запись',
      removeValue: '',
    };
  },
  computed: {
    id() {
      return this.item ? this.item._id : 0;
    },
  },
  methods: {
    ...mapActions(['deleteData', 'insertData']),
    confirmAction(toEdit = false) {
      let actionStr;

      if (!toEdit) {
        actionStr = 'удалить';
      } else if (this.id) {
        actionStr = 'обновить';
      } else {
        actionStr = 'добавить';
      }

      const postfix = this.id ? `: "${this.id}"` : '';

      return confirm(
        `Вы уверены, что хотите ${actionStr} ${this.removeTitle}${postfix}?`,
      );
    },
    removeItem() {
      if (this.confirmAction()) {
        this.deleteData(this.id);
      }
    },
    sendData() {
      this.prepareData();

      if (!this.item) {
        this.insertData(this.submitData);
        this.reset();
      } else {
        this.updateData({ id: this.item._id, data: this.submitData });
      }
    },
    afterSubmit() {},
    submit() {
      if (this.touchInvalidElem()) {
        return false;
      }

      if (this.confirmAction(true)) {
        this.sendData();
        this.afterSubmit();
        return true;
      }
    },
  },
  // created() {
  //   if (this.item) {
  //     for (const key in this.item) {
  //       if (this.item.hasOwnProperty(key)) {
  //         this.sourceData[key] = this.item[key];
  //       }
  //     }
  //   }
  // },
};
