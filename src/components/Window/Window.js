import React from 'react'
import {DevTools} from '../../utils/DevTools'
import {PremierAgentNav} from '../PremierAgentNav'

/**
 * @param children
 * @returns {XML}
 * @constructor
 */
export const Window = ({children}) => {
  return (
    <div className="">
      <PremierAgentNav/>
      <div className="">
        {children}
      </div>
      {__DEV__ ? <DevTools/> : ''}
    </div>
  )
};

Window.displayName = 'Window';
Window.propTypes = {
  children: React.PropTypes.any
};
Window.defaultProps = {};
