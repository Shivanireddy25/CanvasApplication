import React from 'react';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import MyComponent from '../src/components/Courses/Courses';
describe('MyComponent', () => {
  it('Verify the class Name', () => {
    const component = shallow(<MyComponent debug/>);
    expect(component.hasClass('container')).toEqual(false);
  });
});