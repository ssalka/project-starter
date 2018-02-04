import React from 'react';
import { shallow, mount } from 'enzyme';
import { Counter } from 'src/client/components';

describe('Counter class', () => {
  const { initialValue } = Counter.defaultProps;

  describe('#constructor', () => {
    it(`sets initial state value to ${initialValue} by default`, () => {
      const counter = shallow(<Counter />);

      expect(counter.state()).toEqual({ value: initialValue });
    });

    it('sets initial state value to value of `initialValue` prop, if provided', () => {
      const newInitialValue = Math.random();
      const counter = shallow(<Counter initialValue={newInitialValue} />);

      expect(counter.state()).toEqual({ value: newInitialValue });
    });
  });

  describe('#decrement', () => {
    it('is called when the first button is clicked', () => {
      const counter = mount(<Counter />);
      const instance = counter.instance();
      const decrementSpy = jest.spyOn(instance, 'decrement');

      instance.forceUpdate();
      counter.find('button').first().simulate('click');

      expect(decrementSpy).toHaveBeenCalled();
    });

    it('lowers the counter value by 1', () => {
      const counter = shallow(<Counter />);

      counter.instance().decrement();

      expect(counter.state()).toEqual({ value: initialValue - 1 });
    });
  });

  describe('#increment', () => {
    it('is called when the second button is clicked', () => {
      const counter = mount(<Counter />);
      const instance = counter.instance();
      const incrementSpy = jest.spyOn(instance, 'increment');

      instance.forceUpdate();
      counter.find('button').last().simulate('click');

      expect(incrementSpy).toHaveBeenCalled();
    });

    it('raises the counter value by 1', () => {
      const counter = shallow(<Counter />);

      counter.instance().increment();

      expect(counter.state()).toEqual({ value: initialValue + 1 });
    });
  });
});
