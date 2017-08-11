import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Input, Button } from 'semantic-ui-react';

import './StringCriteria.css';

const options = [
  { text: 'contains', value: '$regex' },
  { text: 'not equal', value: '$ne' },
  { text: 'equal', value: '$eq' }
];

const getOperatorFromQueryObject = query => {
  if (query.hasOwnProperty('$regex') && query.hasOwnProperty('$option'))
    return '$regex';
  if (query.hasOwnProperty('$ne')) return '$ne';
  return '$eq';
};

const ControlledStringCriteria = ({
  query,
  open = false,
  onFocus,
  onBlur,
  onValueChange,
  onOperatorChange,
  style
}) => {
  const key = Object.keys(query)[0];
  return (
    <div>
      <Dropdown
        className="selection"
        floating
        open={open}
        options={options}
        value={key}
        onChange={onOperatorChange}
        onClick={onFocus}
        onBlur={onBlur}
        style={style}
      />
      <Input
        placeholder="Put some text here"
        value={query[key]}
        onChange={onValueChange}
        floating
        //style={{ width: 200 }}
      />
    </div>
  );
};

const control = WrappedComponent =>
  class extends Component {
    static propTypes = {
      onChange: PropTypes.func.isRequired,
      style: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        open: false
      };
    }

    /*static get defaultProps() {
      return {
        query: { $eq: '' }
      };
    }*/

    handleFocus = () => this.setState({ open: true });

    handleBlur = () => this.setState({ open: false });

    onOperatorChange = (e, data) => {
      e.stopPropagation();
      const newQuery = { [data.value]: Object.values(this.props.query)[0] };
      this.props.onChange(newQuery);
      this.setState({ open: false });
    };

    onValueChange = (e, data) => {
      e.stopPropagation();
      const newQuery = { [Object.keys(this.props.query)[0]]: data.value };
      this.props.onChange(newQuery);
      this.setState({ open: false });
    };

    render() {
      const { open } = this.state;
      const { query, style } = this.props;
      return (
        <WrappedComponent
          query={query}
          open={open}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValueChange={this.onValueChange}
          onOperatorChange={this.onOperatorChange}
          style={style}
        />
      );
    }
  };

const container = WrappedComponent =>
  class extends Component {
    static propTypes = {
      query: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      style: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        query: this.props.query
        //query: { $eq: '' }
      };
    }

    handleChange = e => {
      this.setState({ query: e });
    };

    componentDidUpdate() {
      const { onChange } = this.props;
      onChange(this.state.queries);
    }

    render() {
      const { style } = this.props;
      return (
        <WrappedComponent
          query={this.state.query}
          onChange={this.handleChange}
          style={style}
        />
      );
    }
  };

const StringCriteria = control(ControlledStringCriteria);

const TestString = container(StringCriteria);

export { StringCriteria, ControlledStringCriteria, TestString };
