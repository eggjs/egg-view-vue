'use strict';
const Vue = require('vue');
module.exports = new Vue({
  template: [
    '<ul>',
    '<li key="id" v-for="item in model">{{item.name}}</li>',
    '</ul>'
  ].join(''),
  data: {
    model: [
      {
        id: 1,
        first: true,
        name: 'sky'
      },
      {
        id: 2,
        first: false,
        name: 'carl'
      }
    ]
  }
});
