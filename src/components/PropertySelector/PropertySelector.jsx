import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button } from 'semantic-ui-react';

import './PropertySelector.css';

const ControlledPropertySelector = ({
  open = false,
  options,
  value,
  onFocus,
  onBlur,
  onChange
}) => {
  return (
    <Dropdown
      className="selection"
      floating
      open={open}
      options={options}
      value={value}
      onClick={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      style={{ margin: 10 }}
    />
  );
};

const control = WrappedComponent =>
  class extends Component {
    static propsTypes = {
      options: PropTypes.array,
      value: PropTypes.string,
      onChange: PropTypes.func
    };

    constructor(props) {
      super(props);
      this.state = { open: false };
    }

    handleFocus = () => this.setState({ open: true });

    handleBlur = () => this.setState({ open: false });

    handleChange = (e, { value }) => {
      this.setState({ open: false });
      this.props.onChange(value);
    };

    render() {
      return (
        <WrappedComponent
          open={this.state.open}
          options={this.props.options}
          value={this.props.value}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
        />
      );
    }
  };

const PropertySelector = control(ControlledPropertySelector);

class TestPropertySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  handleChange = value => {
    this.props.onChange(value);
    this.setState({ value });
  };

  render() {
    return (
      <PropertySelector
        value={this.state.value}
        options={this.props.options}
        onChange={this.handleChange}
      />
    );
  }
}

export { ControlledPropertySelector, PropertySelector, TestPropertySelector };
