<!--FormStackForm.vue -->
<template>
    <div class="form">
          <div
          class="form-item"
          v-for="item in formInfo.fields"
          v-bind:key="item.id">
            <textarea v-if="item.type === 'textarea'"
              v-model="item.value"
              :placeholder="item.label"
              :class="item.label"/>
            <input v-else
              v-model="item.value"
              :placeholder="item.label"
              :class="item.label"/>
          </div>
        <span class="disclaimer"> {{ this.disclaimer}} </span>
        <button v-on:click="postForm" class="submit">Submit</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FormStackForm',
  props: {
    formID: Number,
    oAuthToken: String,
    disclaimer: String,
  },
  data() {
    return {
      formInfo: {
        fields: [],
      },
      submission: false,
    };
  },

  mounted() {
    const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = `https://www.formstack.com/api/v2/form/${this.formID}.json`;
    axios({
      async: true,
      crossDomain: true,
      url: corsAnywhere + apiURL,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.oAuthToken}`,
      },
    })
      .then((response) => {
        this.formInfo = response.data;
      });
  },
  methods: {
    postForm() {
      const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
      const apiURL = `https://www.formstack.com/api/v2/form/${this.formID}/submission.json`;
      const formData = new FormData();
      for (let i = 0; i < this.formInfo.fields.length; i += 1) {
        formData.append(`field_${this.formInfo.fields[i].id}`, `${this.formInfo.fields[i].value}`);
      }
      axios({
        async: true,
        crossDomain: true,
        url: corsAnywhere + apiURL,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.oAuthToken}`,
        },
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        data: formData,
      })
        .then((response) => {
          console.log(response.data);
        });
    },
  },
};
</script>

<style>
</style>
