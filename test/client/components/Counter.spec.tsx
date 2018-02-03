import * as React from 'react';
import { shallow } from 'enzyme';
import { Counter } from 'src/client/components';

describe('Counter', () => {
  it('renders without error', () => {
    const counter = shallow(<Counter />);

    expect(counter.exists()).toBe(true);
  });
});
