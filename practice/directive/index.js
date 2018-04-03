import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>{{text}}</div>
  `,
  data: {
    text: 0,
    active: false
  }
})
