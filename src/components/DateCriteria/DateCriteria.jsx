import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Input } from 'semantic-ui-react';
import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import './DateCriteria.css';

const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';

const isStarOfDay = date => {
  const midnight = moment(date).startOf('day');
  return midnight.diff(moment(date)) === 0;
};

const isEndOfDay = date => {
  const endOfDay = moment(date).endOf('day');
  return endOfDay.diff(moment(date)) === 0;
};

const isStartAndEndOfOneDay = (start, end) =>
  isStarOfDay(start) &&
  isEndOfDay(end) &&
  moment(start).diff(moment(end), 'day') === 0;

const options = [
  { text: 'is in', value: '$in' },
  { text: 'is after', value: '$gt' },
  { text: 'is before', value: '$lt' },
  { text: 'is between', value: '$between' }
];

const ControlledDateCriteria = ({
  query,
  onStartChange,
  onOperatorChange,
  onEndChange,
  style
}) => {
  const { $lt, $gt } = query;
  const keys = Object.keys(query);
  const operator =
    keys.length === 1
      ? keys[0]
      : isStartAndEndOfOneDay($gt, $lt) ? '$in' : '$between';

  const dayInputStyle = {
    margin: '10px',
    padding: '8px'
  };
  return (
    <span>
      <Dropdown
        className="selection"
        floating
        value={operator}
        options={options}
        onChange={onOperatorChange}
        style={style}
      />
      {$gt &&
        <DayPickerInput
          placeholder={DEFAULT_DATE_FORMAT}
          format={DEFAULT_DATE_FORMAT}
          value={moment($gt).format(DEFAULT_DATE_FORMAT)}
          style={dayInputStyle}
          onDayChange={onStartChange}
        />}
      {operator === '$between' ? <span>and</span> : <none />}
      {$lt &&
        operator !== '$in' &&
        <DayPickerInput
          placeholder={DEFAULT_DATE_FORMAT}
          format={DEFAULT_DATE_FORMAT}
          value={moment($lt).format(DEFAULT_DATE_FORMAT)}
          style={dayInputStyle}
          onDayChange={onEndChange}
        />}
    </span>
  );
};

const control = WrappedComponent =>
  class extends Component {
    static propTypes = {
      query: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      style: PropTypes.object.isRequired
    };

    onInputChange = field => value => {
      this.props.onChange(
        Object.assign(
          {},
          { ...this.props.query },
          {
            [field]: value.toISOString()
          }
        )
      );
    };

    onOperatorChange = (e, { value: operator }) => {
      let newQuery;
      const DEFAULT_START = moment().startOf('day').toISOString();
      const DEFAULT_END = moment().endOf('day').toISOString();
      switch (operator) {
        case '$gt': {
          newQuery = {
            [operator]: DEFAULT_START
          };
          break;
        }
        case '$lt': {
          newQuery = {
            [operator]: DEFAULT_START
          };
          break;
        }
        case '$between': {
          newQuery = {
            $lt: DEFAULT_START,
            $gt: DEFAULT_START
          };
          break;
        }
        case '$in': {
          newQuery = {
            $gt: DEFAULT_START,
            $lt: DEFAULT_END
          };
        }
      }
      this.props.onChange(newQuery);
    };

    render() {
      const { query, style } = this.props;
      return (
        <WrappedComponent
          query={query}
          style={style}
          onOperatorChange={this.onOperatorChange}
          onStartChange={this.onInputChange('$gt')}
          onEndChange={this.onInputChange('$lt')}
        />
      );
    }
  };

const DateCriteria = control(ControlledDateCriteria);

export { DateCriteria, ControlledDateCriteria };
