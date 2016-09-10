const madoka = require('madoka');

var memory = {contacts: [], contact: null};

const template = {
  data: [
    '{{repeat(30)}}',
    {
      id: "{{objectId()}}"
    }
  ]
};

madoka.save(template, __dirname + '/fixture.json');
