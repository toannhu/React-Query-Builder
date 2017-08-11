import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Input, Button } from 'semantic-ui-react';

import './numberCriteria.css';

const options = [
  { text: 'between', value: '$between' },
  { text: 'greater than', value: '$gt' },
  { text: 'less than', value: '$lt' },
  { text: 'equal', value: '$eq' }
];

const getOperatorFromQueryObject = query => {
  if (query.hasOwnProperty('$eq')) return '$eq';
  if (query.hasOwnProperty('$lt') && query.hasOwnProperty('$gt'))
    return '$between';
  if (query.hasOwnProperty('$lt')) return '$lt';
  return '$gt';
};

const ControlledNumberCriteria = ({
  query,
  open = false,
  onFocus,
  onBlur,
  onValueClick,
  onLeftValueClick,
  onRightValueClick,
  onOperatorClick,
  style
}) => {
  var operator = getOperatorFromQueryObject(query);
  const keys = Object.keys(query);
  return (
    <span>
      <Dropdown
        className="selection"
        floating
        open={open}
        options={options}
        value={operator}
        onClick={onFocus}
        onBlur={onBlur}
        onChange={onOperatorClick}
        style={style}
      />
      {keys.length === 1
        ? <Input
            onChange={onValueClick}
            value={query[keys[0]]}
            style={style}
            type="number"
          />
        : <span>
            <Input
              onChange={onLeftValueClick}
              value={query.$gt}
              style={style}
              type="number"
            />
            and
            <Input
              onChange={onRightValueClick}
              value={query.$lt}
              style={style}
              type="number"
            />
          </span>}
    </span>
  );
};

const control = WrappedComponent =>
  class extends Component {
    static propTypes = {
      onChange: PropTypes.func.isRequired,
      query: PropTypes.object.isRequired,
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
        query: { $eq: 10 }
      };
    }*/

    createQuery = (operator, value, leftValue, rightValue) => {
      let query;
      if (operator === '$between') {
        if (leftValue != undefined && rightValue != undefined) {
          query = { $gt: leftValue, $lt: rightValue };
        } else {
          query = { $gt: 0, $lt: 0 };
        }
      } else {
        query = { [operator]: value };
      }
      return query;
    };

    handleFocus = () => this.setState({ open: true });

    handleBlur = () => this.setState({ open: false });

    handleValueClick = (e, data) => {
      e.stopPropagation();
      const newQuery = this.createQuery(
        getOperatorFromQueryObject(this.props.query),
        Number.parseInt(data.value),
        Object.values(this.props.query)[0],
        Object.values(this.props.query)[1]
      );
      this.props.onChange(newQuery);
    };

    handleLeftValueClick = (e, data) => {
      e.stopPropagation();
      const newQuery = this.createQuery(
        getOperatorFromQueryObject(this.props.query),
        Object.values(this.props.query)[0],
        Number.parseInt(data.value),
        Object.values(this.props.query)[1]
      );
      this.props.onChange(newQuery);
    };

    handleRightValueClick = (e, data) => {
      e.stopPropagation();
      const newQuery = this.createQuery(
        getOperatorFromQueryObject(this.props.query),
        Object.values(this.props.query)[0],
        Object.values(this.props.query)[0],
        Number.parseInt(data.value)
      );
      this.props.onChange(newQuery);
    };

    handleOperatorClick = (e, data) => {
      e.stopPropagation();
      const newQuery = this.createQuery(
        data.value,
        Object.values(this.props.query)[0],
        Object.values(this.props.query)[0],
        Object.values(this.props.query)[1]
      );
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
          onValueClick={this.handleValueClick}
          onLeftValueClick={this.handleLeftValueClick}
          onRightValueClick={this.handleRightValueClick}
          onOperatorClick={this.handleOperatorClick}
          style={style}
        />
      );
    }
  };

const container = WrappedComponent =>
  class extends Component {
    static propTypes = {
      onChange: PropTypes.func.isRequired,
      style: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        query: {
          $gt: 10
        }
      };
    }

    handleChange = e => {
      this.setState({ query: e });
      this.props.onChange(e);
    };

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

const NumberCriteria = control(ControlledNumberCriteria);

const TestNumber = container(NumberCriteria);

export { NumberCriteria, ControlledNumberCriteria, TestNumber };
