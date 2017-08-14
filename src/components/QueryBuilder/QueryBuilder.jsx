import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Icon, Grid } from 'semantic-ui-react';
import './QueryBuilder.css';
import { action } from '@storybook/addon-actions';
import { PropertyList, TestProperty } from '../PropertyList';
import { EventList, TestEventList } from '../EventList';
import { Select } from '../Select';
import { DumpTableComponent } from '../Table/tableResultComponent';
import { PlatformMatch } from '../Platform';

const options = [{ text: 'All', value: '$all' }, { text: 'Any', value: '$or' }];

const ControlledQueryBuilder = ({
  structure,
  queries,
  groups,
  onChange,
  onAdd,
  onRemove,
  onPropertyNameChange,
  onCheckAllPlatform,
  onPlatformChange,
  style
}) => {
  return (
    <div>
      <Grid celled="internally" fluid container>
        <Grid.Row color="facebook">
          <Grid.Column width={14}>
            <div>
              <span style={{ fontWeight: 'bolder', fontSize: 30 }}>
                Query Builder
              </span>
            </div>
          </Grid.Column>
          <Grid.Column width={2}>
            <Button
              label="Bookmark"
              icon="bookmark"
              labelPosition="right"
              floated
              fluid
              color="facebook"
              onClick={action('Bookmark Clicked')}
              style={{ width: 80 }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row color="facebook">
          <PlatformMatch
            queries={queries['platforms']}
            onChange={onCheckAllPlatform}
            onPlatformChange={onPlatformChange}
            style={{}}
          />
        </Grid.Row>
        <Grid.Row color="facebook">
          <Grid.Column width={16}>
            <div>
              <PropertyList
                queries={queries['profile_criteria']}
                structure={structure}
                groups={groups}
                onChange={onChange}
                onAdd={onAdd}
                onRemove={onRemove}
                onPropertyNameChange={onPropertyNameChange}
                style={style}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row color="facebook">
          <Grid.Column floated="right" style={{ width: '230px' }}>
            <Button
              icon="repeat"
              color="facebook"
              content="Revert"
              onClick={action('Revert Button Click')}
            />
            <Button
              color="green"
              content="Save"
              onClick={action('Save Button Click')}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <DumpTableComponent queries={queries['platforms']} />
    </div>
  );
};

const control = WrappedComponent =>
  class extends Component {
    static propTypes = {
      queries: PropTypes.array.isRequired,
      structure: PropTypes.object.isRequired,
      groups: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      style: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        queries: this.props.queries
      };
    }

    handleAdd = e => {
      let newQueries = this.state.queries['profile_criteria'].slice();
      switch (e.value) {
        case 'name': {
          newQueries.push({ _name: { $eq: '' }, _value: 20.5 });
          break;
        }
        case 'email': {
          newQueries.push({ _email: { $eq: '' }, _value: 50.6 });
          break;
        }
        case 'age': {
          newQueries.push({ _age: { $gt: '' } });
          break;
        }
        case 'createAt': {
          newQueries.push({
            _createAt: {
              $gt: '2017-07-15T17:00:00.000Z',
              $lt: '2017-07-17T17:00:00.000Z'
            },
            _value: 60
          });
          break;
        }
        default:
          break;
      }
      newQueries = Object.assign(
        {},
        { ...this.state.queries },
        { profile_criteria: newQueries }
      );
      this.setState({ queries: newQueries });
    };

    handleRemove = e => {
      let newQueries = this.state.queries['profile_criteria'].slice();
      newQueries.splice(e.index, 1);
      newQueries = Object.assign(
        {},
        { ...this.state.queries },
        { profile_criteria: newQueries }
      );
      this.setState({ queries: newQueries });
    };

    handlePropertyNameChange = e => {
      let newQueries = this.state.queries['profile_criteria'].slice();
      newQueries.splice(
        e.index,
        1,
        Object.assign({}, { ...e.query }, { _value: 35.5 })
      );
      newQueries = Object.assign(
        {},
        { ...this.state.queries },
        { profile_criteria: newQueries }
      );
      this.setState({ queries: newQueries });
    };

    handleCheckAllPlatform = e => {
      let subQueries = this.state.queries['platforms'].slice();
      let newQueries = [];
      Object.values(subQueries).map((query, index) => {
        newQueries.push(Object.assign({}, { ...query }, { value: e.checked }));
      });
      newQueries = Object.assign(
        {},
        { ...this.state.queries },
        { platforms: newQueries }
      );
      this.setState({ queries: newQueries });
    };

    handlePlatformChange = e => {
      let newQueries = this.state.queries['platforms'].slice();
      newQueries[e.index].value = e.checked;
      newQueries = Object.assign(
        {},
        { ...this.state.queries },
        { platforms: newQueries }
      );
      this.setState({ queries: newQueries });
    };

    handleOptionChange = e => {
      let newQueries = this.state.queries['profile_criteria'].slice();
      const propName = Object.keys(newQueries[e.index])[0];
      const operator =
        Object.keys(e.payload).length > 1
          ? '$between'
          : Object.keys(e.payload)[0];
      const value =
        Object.values(e.payload).length > 1
          ? [Object.values(e.payload)[0], Object.values(e.payload)[1]]
          : Object.values(e.payload)[0];
      let query;
      if (operator != '$between') {
        if (value == '') {
          query = { [propName]: { [operator]: '' }, _value: 30 };
        } else {
          query = {
            [propName]: { [operator]: value },
            _value: 40
          };
        }
      } else {
        query = { [propName]: { $gt: value[0], $lt: value[1] }, _value: 30 };
      }
      newQueries.splice(e.index, 1, query);
      newQueries = Object.assign(
        {},
        { ...this.state.queries },
        { profile_criteria: newQueries }
      );
      this.setState({ queries: newQueries });
    };

    componentDidUpdate() {
      const { onChange } = this.props;
      onChange(this.state.queries);
    }

    render() {
      const { structure, style, groups } = this.props;
      const queries = this.state.queries;
      return (
        <WrappedComponent
          queries={queries}
          structure={structure}
          groups={groups}
          style={style}
          onAdd={this.handleAdd}
          onRemove={this.handleRemove}
          onChange={this.handleOptionChange}
          onPropertyNameChange={this.handlePropertyNameChange}
          onPlatformChange={this.handlePlatformChange}
          onCheckAllPlatform={this.handleCheckAllPlatform}
        />
      );
    }
  };

const QueryBuilder = control(ControlledQueryBuilder);

export { QueryBuilder, ControlledQueryBuilder };
