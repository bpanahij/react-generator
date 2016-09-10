import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {<%= component.className %>} from './<%= component.fileName %>';

describe('<<%= component.className %> />', () => {
  let component;
  beforeEach(() => {
    component = shallow(<<%= component.className %> />);
  });
  it('should be tested!!!', () => {
    expect(component).to.not.exist;
  });
});
