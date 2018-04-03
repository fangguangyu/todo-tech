import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <span>{{name}}</span> 
    </div>
   `,
  data: {
    firstName: 'fang',
    lastName: 'guangyu'
  },
  computed: {
    name () {
      return `${this.firstName} ${this.lastName}`
    }
  }
})
