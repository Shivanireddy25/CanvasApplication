import React from 'react';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import MyComponent from '../src/components/signUp/signUp';
describe('MyComponent', () => {
    
  it('Check the snapshot after sending props', () => {
    const props = {
        component: () => {}
    }
    const component = shallow(<MyComponent  {...props} debug/>);
    expect(component).toMatchSnapshot();
  });
});
