import React from 'react';
import classNames from 'classnames'
<% if (hasStyle) { %>import classes from './<%= component.className %>.css';<% } %>
export class <%= component.className %> extends React.Component {
  render() {
  return (
  <div className="">
  Please edit <%= component.path %><%= component.fileName %> to update this component!
  </div>
  );
  }
}

<%= component.className %>.displayName = '<%= component.displayName %>';
<%= component.className %>.propTypes = {};
<%= component.className %>.defaultProps = {};
