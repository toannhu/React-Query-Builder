import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Icon } from 'semantic-ui-react';
import './EventList.css';

import { action } from '@storybook/addon-actions';

import moment from 'moment';
import {
  EventFrequencyCriteria,
  TestEventFrequency
} from '../EventFrequencyCriteria';

const structureToOptions = structure =>
  Object.keys(structure).map(option => {
    return {
      text: option,
      value: `_${option}`
    };
  });

const ControlledEventList = ({
  queries,
  groups,
  onAdd,
  onRemove,
  onOptionChange,
  onPropertyNameChange
}) => {
  const criteriaNames = queries.map(criteria => Object.keys(criteria)[0]);

  const criteriaQueries = queries.map(criteria => Object.values(criteria)[0]);
  return (
    <div>
      {queries.map((query, idx) => {
        return (
          <tr>
            <td>
              <Icon name="calendar check" />
            </td>
            <td>
              <EventFrequencyCriteria
                query={query}
                onChange={onOptionChange(idx)}
              />
            </td>
            <td>
              <Button
                icon="remove user"
                color="red"
                circular
                onClick={onRemove(idx)}
              />
            </td>
          </tr>
        );
      })}
      <span>
        <Button icon="add user" color="blue" circular onClick={onAdd} />
      </span>
    </div>
  );
};

const control = WrappedComponent =>
  class extends Component {
    static propTypes = {
      queries: PropTypes.array.isRequired,
      groups: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      onAdd: PropTypes.func.isRequired,
      onRemove: PropTypes.func.isRequired,
      style: PropTypes.object.isRequired
    };

    onAdd = () => {
      this.props.onAdd({
        type: 'add'
      });
    };

    onRemove = index => () => {
      this.props.onRemove({
        type: 'remove',
        index
      });
    };

    onOptionChange = index => payload => {
      this.props.onChange({
        type: 'change',
        payload,
        index
      });
    };

    render() {
      const { queries, style, groups } = this.props;
      return (
        <WrappedComponent
          queries={queries}
          groups={groups}
          style={style}
          onAdd={this.onAdd}
          onRemove={this.onRemove}
          onOptionChange={this.onOptionChange}
        />
      );
    }
  };

const container = WrappedComponent =>
  class extends Component {
    static propTypes = {
      queries: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired,
      style: PropTypes.object.isRequired,
      groups: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        queries: this.props.queries
      };
    }

    handleAdd = e => {
      let newQueries = this.state.queries.slice();
      newQueries.push({
        type: 'performed',
        frequency: { type: '$within', days: '' },
        query: { name: '_signin' }
      });
      this.setState({ queries: newQueries });
    };

    handleRemove = e => {
      let newQueries = this.state.queries.slice();
      newQueries.splice(e.index, 1);
      this.setState({ queries: newQueries });
    };

    handleOptionChange = e => {
      let newQueries = this.state.queries.slice();
      switch (e.payload.typeChange) {
        case 'eventType':
          newQueries.splice(
            e.index,
            1,
            Object.assign(
              {},
              { ...newQueries[e.index] },
              {
                query: { name: e.payload.eventType }
              }
            )
          );
          this.setState({ queries: newQueries });
          break;
        case 'actionType':
          newQueries.splice(
            e.index,
            1,
            Object.assign(
              {},
              { ...newQueries[e.index] },
              {
                type: e.payload.actionType
              }
            )
          );
          this.setState({ queries: newQueries });
          break;
        case 'frequencyTypeChange':
          newQueries.splice(
            e.index,
            1,
            Object.assign(
              {},
              { ...newQueries[e.index] },
              {
                frequency: e.payload.frequency
              }
            )
          );
          this.setState({ queries: newQueries });
          break;
        case 'dayValueChange':
          newQueries.splice(
            e.index,
            1,
            Object.assign(
              {},
              { ...newQueries[e.index] },
              {
                frequency: e.payload.frequency
              }
            )
          );
          this.setState({ queries: newQueries });
          break;
        default:
          break;
      }
    };

    componentDidUpdate() {
      const { onChange } = this.props;
      onChange(this.state.queries);
    }

    render() {
      const { style, groups } = this.props;
      const queries = this.state.queries;
      return (
        <WrappedComponent
          queries={queries}
          groups={groups}
          onAdd={this.handleAdd}
          onRemove={this.handleRemove}
          onChange={this.handleOptionChange}
          style={style}
        />
      );
    }
  };

const EventList = control(ControlledEventList);

const TestEventList = container(EventList);

export { EventList, ControlledEventList, TestEventList };
