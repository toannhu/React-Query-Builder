import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Input } from 'semantic-ui-react';

import './EventFrequencyCriteria.css';

const actionOptions = [
  {
    text: 'was performed',
    value: 'performed'
  },
  {
    text: 'was not performed',
    value: 'not_performed'
  }
];

const frequencyOptions = [
  {
    text: 'within',
    value: '$within'
  },
  {
    text: 'between',
    value: '$between'
  },
  {
    text: 'less than',
    value: '$less_than'
  },
  {
    text: 'greater than',
    value: '$greater_than'
  },
  {
    text: 'exactly',
    value: '$exactly'
  }
];

const eventOptions = [
  {
    text: 'Subscription Purchase',
    value: '_subcription_purchased'
  },
  {
    text: 'Movie Content Favourited',
    value: '_content_favourited'
  },
  {
    text: 'Sign in',
    value: '_signin'
  },
  {
    text: 'Movie Content Consumed',
    value: '_content_consumed'
  },
  {
    text: 'Sign up',
    value: '_signup'
  }
];

const ControlledEventFrequencyCriteria = ({
  query,
  onEventTypeChange,
  onActionTypeChange,
  onFrequencyTypeChange,
  onTimesGtChange,
  onTimesLtChange,
  onDaysValueChange
}) => {
  const { type: actionType, frequency, query: eventType } = query;
  const { days, times, type: frequencyType } = frequency;
  return (
    <span>
      <Dropdown
        floating
        options={eventOptions}
        value={Object.values(eventType)[0]}
        style={{ margin: '7px' }}
        className="noscrolling"
        onChange={onEventTypeChange}
      />
      <Dropdown
        floating
        options={actionOptions}
        value={actionType}
        style={{ margin: '7px' }}
        className="noscrolling"
        onChange={onActionTypeChange}
      />
      {actionType === 'not_performed'
        ? <none />
        : <span>
            <Dropdown
              floating
              options={frequencyOptions}
              value={frequencyType}
              style={{ margin: '10px' }}
              className="noscrolling"
              onChange={onFrequencyTypeChange}
            />
            {times &&
              <span>
                <Input
                  type="number"
                  style={{ margin: '7px' }}
                  size="tiny"
                  value={frequencyType === '$between' ? times[0] : times}
                  onChange={onTimesGtChange}
                  focus
                />
                {frequencyType === '$between' && <span>and</span>}
                {typeof times !== 'number' &&
                  <Input
                    type="number"
                    style={{ margin: '7px' }}
                    size="tiny"
                    value={times[1]}
                    onChange={onTimesLtChange}
                    focus
                  />}
                <span>
                  {' times '}
                </span>
              </span>}
          </span>}
      <span>
        {frequencyType === '$within' ? ' the last ' : ' in the last '}
      </span>
      <Input
        type="number"
        style={{ margin: '7px' }}
        size="tiny"
        focus
        value={days}
        onChange={onDaysValueChange}
      />
      days
    </span>
  );
};

const control = WrappedComponent =>
  class extends Component {
    static propTypes = {
      query: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired
    };

    handleActionTypeChange = (e, { value: actionType }) => {
      this.props.onChange({
        ...this.props.query,
        actionType: actionType,
        typeChange: 'actionType'
      });
    };

    handleEventTypeChange = (e, { value: eventType }) => {
      this.props.onChange({
        ...this.props.query,
        eventType: eventType,
        typeChange: 'eventType'
      });
    };

    handleFrequencyTypeChange = (e, { value: frequencyType }) => {
      const { query } = this.props;
      const { frequency } = query;
      const oldFrequencyType = frequency.type;
      const newFrequency = {
        ...frequency,
        type: frequencyType
      };
      if (oldFrequencyType !== frequencyType) {
        if (frequencyType === '$between') newFrequency.times = [0, 1];
        if (oldFrequencyType === '$between') newFrequency.times = 0;
        if (frequencyType === '$within') delete newFrequency.times;
      }
      this.props.onChange({
        frequency: newFrequency,
        typeChange: 'frequencyTypeChange'
      });
    };

    handleDaysValueChange = (e, { value: days }) => {
      const { query } = this.props;
      const { frequency } = query;
      this.props.onChange({
        frequency: {
          ...frequency,
          days
        },
        typeChange: 'dayValueChange'
      });
    };

    handleTimesValueChange = index => (e, { value }) => {
      const { query } = this.props;
      const { frequency } = query;
      const { times: oldTimes, type } = frequency;
      const timesValue = Number.parseInt(value);
      const times =
        type === '$between'
          ? Object.assign(oldTimes, { [index]: Number.parseInt(value) })
          : timesValue;
      this.props.onChange({
        frequency: {
          ...frequency,
          times
        }
      });
    };

    render() {
      const { query } = this.props;
      return (
        <WrappedComponent
          query={query}
          onDaysValueChange={this.handleDaysValueChange}
          onFrequencyTypeChange={this.handleFrequencyTypeChange}
          onActionTypeChange={this.handleActionTypeChange}
          onEventTypeChange={this.handleEventTypeChange}
          onTimesGtChange={this.handleTimesValueChange(0)}
          onTimesLtChange={this.handleTimesValueChange(1)}
        />
      );
    }
  };

const container = WrappedComponent =>
  class extends Component {
    static propTypes = {
      query: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        query: this.props.query
      };
    }

    handleChangeValue = e => {
      let newQueries;
      if (e.hasOwnProperty('eventType')) {
        newQueries = Object.assign(
          {},
          { ...this.state.query },
          { query: { name: e['eventType'] } }
        );
      } else if (e.hasOwnProperty('actionType')) {
        newQueries = Object.assign(
          {},
          { ...this.state.query },
          { type: e['actionType'] }
        );
      } else {
        newQueries = Object.assign(
          {},
          { ...this.state.query },
          { frequency: Object.values(e)[0] }
        );
      }
      this.setState({ query: newQueries });
    };

    componentDidUpdate() {
      this.props.onChange(this.state.query);
    }

    render() {
      const { query } = this.state;
      return (
        <WrappedComponent query={query} onChange={this.handleChangeValue} />
      );
    }
  };

const EventFrequencyCriteria = control(ControlledEventFrequencyCriteria);

const TestEventFrequency = container(EventFrequencyCriteria);

export {
  ControlledEventFrequencyCriteria,
  EventFrequencyCriteria,
  TestEventFrequency
};
