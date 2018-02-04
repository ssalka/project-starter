import React from 'react';
import bind from 'bind-decorator';

interface ICounterProps {
  initialValue?: number;
}

interface ICounterState {
  value: number;
}

export default class Counter extends React.Component<ICounterProps, ICounterState> {
  static defaultProps: ICounterProps = {
    initialValue: 0
  };

  state: ICounterState = {
    value: this.props.initialValue
  };

  @bind decrement() {
    const { value } = this.state;
    this.setState({ value: value - 1 });
  }

  @bind increment() {
    const { value } = this.state;
    this.setState({ value: value + 1 });
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.decrement}>-</button>
        &nbsp;
        {this.state.value}
        &nbsp;
        <button onClick={this.increment}>+</button>
      </React.Fragment>
    );
  }
}
