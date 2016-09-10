import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {Window} from './Window.js';
import {DevTools} from '../../utils/DevTools'

describe('<Window />', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Window />);
  });
  it('should render', () => {
    expect(component).to.exist;
  });
  it('should render children', () => {
    component = shallow(<Window>
      <div id="test"></div>
    </Window>);
    expect(component.find('#test')).to.exist;
  });
  it('should show DevTools in develop mode', () => {
    window.__DEV__ = true;
    expect(component.find(DevTools)).to.have.length(1);
  });
  it('should NOT show DevTools in production mode', () => {
    window.__DEV__ = false;
    expect(component.find(DevTools)).to.have.length(1);
  });
});
