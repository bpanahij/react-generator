import {<%= route.className %>} from '../components/<%= route.className %>'

export const <%= route.route %>Route = (store) => ({
  path: '<%= route.route %>',
  component: <%= route.className %>
});
