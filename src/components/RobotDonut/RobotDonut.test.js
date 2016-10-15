import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {RobotDonut} from './RobotDonut.js';

describe('<RobotDonut />', () => {
  let component;
  beforeEach(() => {
    component = shallow(<RobotDonut />);
  });
  it('should be tested!!!', () => {
    expect(component).to.not.exist;
  });
});
