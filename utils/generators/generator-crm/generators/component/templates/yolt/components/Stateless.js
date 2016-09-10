import React from 'react';
import classNames from 'classnames'
<% if (hasStyle) { %>import classes from './<%= component.className %>.css';<% } %>
export const <%= component.className %> = ({}) => {

  return (
  <div className="">
  Please edit <%= component.path %><%= component.fileName %> to update this component!
  </div>
  );
};

<%= component.className %>.displayName = '<%= component.displayName %>';
<%= component.className %>.propTypes = {};
<%= component.className %>.defaultProps = {};
