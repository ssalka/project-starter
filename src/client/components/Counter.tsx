import * as React from 'react';

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

  decrement = () => this.setState({ value: this.state.value - 1 });

  increment = () => this.setState({ value: this.state.value + 1 });

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
