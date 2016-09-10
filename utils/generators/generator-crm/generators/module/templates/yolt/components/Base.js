import React from 'react';
import classes from './<%= component.className %>.scss';

export class <%= component.className %> extends React.Component {
  render() {
    return (
      <div className={classes.main}>
        Please edit <%= component.path %><%= component.fileName %> to update this component!
      </div>
    );
  }
}

<%= component.className %>.displayName = '<%= component.displayName %>';
<%= component.className %>.propTypes = {};
<%= component.className %>.defaultProps = {};
