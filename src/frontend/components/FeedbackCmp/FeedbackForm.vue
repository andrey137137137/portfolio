<template lang="pug">
FrontFormWrapper#feedback.section.container.container--full_width.feedback_form(
  @submit.prevent.native='submit'
)
  h2.section-title.section-title--uppercase.section-title--underlined.feedback_form-title Связаться со мной

  InputEventElem(
    :addInputClasses='inputClasses',
    ref='author',
    name='author',
    v-model='author',
    :val='$v.author',
    placeholder='Пользователь'
  )

  InputEventElem(
    :addInputClasses='inputClasses',
    ref='position',
    name='position',
    v-model='position',
    :val='$v.position',
    placeholder='Должность'
  )

  InputEventElem(
    :addInputClasses='inputClasses',
    type='email',
    ref='email',
    name='email',
    v-model='email',
    :val='$v.email',
    placeholder='Почта'
  )

  InputEventElem(
    :addInputClasses='inputClasses',
    type='textarea',
    ref='description',
    name='description',
    v-model='description',
    :val='$v.description',
    placeholder='Сообщение'
  )

  ErrorElem(:message='formError', :styleTop='errorStyleTop')

  .menu.form-menu.feedback_form-menu
    input.menu-link.btn(type='submit', value='Отправить')
    input.menu-link.btn.btn--full_opacity(type='reset', value='Очистить')
  SubmitMessage
</template>

<script>
import axios from 'axios';
import {
  required,
  alphaNum,
  email,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators';
import { SUCCESS, ERROR } from '@httpSt';
import frontFormMixin from '@frontend/mixins/frontFormMixin';
import FrontFormWrapper from '@frontCmp/FrontFormWrapper';
import InputEventElem from '@components/formElems/InputEventElem';
import ErrorElem from '@components/formElems/ErrorElem';
import SubmitMessage from '@components/formElems/SubmitMessage';

import { mapActions } from 'vuex';

export default {
  name: 'FeedbackForm',
  components: {
    FrontFormWrapper,
    InputEventElem,
    ErrorElem,
    SubmitMessage,
  },
  mixins: [frontFormMixin],
  data() {
    return {
      author: '',
      position: '',
      email: '',
      description: '',
    };
  },
  computed: {
    containerClasses() {
      return {
        feedback_form: true,
      };
    },
    inputWrapClasses() {
      return {
        'feedback_form-row': true,
      };
    },
    inputClasses() {
      return {
        'feedback_form-text_input': true,
      };
    },
  },
  validations: {
    author: {
      required,
      alphaNum,
    },
    position: { required },
    email: {
      required,
      email,
    },
    description: {
      required,
      minLength: minLength(27),
      maxLength: maxLength(527),
    },
  },
  methods: {
    ...mapActions(['setAuthStatus', 'setFormMessage']),
    submitActions() {
      if (!confirm('Отправить сообщение?')) {
        return;
      }

      const $vm = this;
      const { author, position, email, description } = this;

      axios
        .post('comment', { author, position, email, description })
        .then(res => {
          $vm.setFormMessage({ status: SUCCESS, message: res.data.message });
          return;
        })
        .catch(err => {
          if (!err.response) {
            $vm.setFormMessage({ status: ERROR, message: '' });
            return;
          }

          const status = err.response.status;
          const message = err.response.data.message;
          $vm.setFormMessage({ status, message });
        });
    },
  },
};
</script>
