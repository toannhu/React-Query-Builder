import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dropdown,
  Icon,
  Progress,
  Label,
  Divider,
  Grid,
  Segment,
  Rail
} from 'semantic-ui-react';
import './PropertyList.css';

import { action } from '@storybook/addon-actions';

import moment from 'moment';
import { NumberCriteria } from '../NumberCriteria';
import { StringCriteria } from '../StringCriteria';
import { PropertySelector } from '../PropertySelector';
import { DateCriteria } from '../DateCriteria';

const options = [
  {
    text: 'Name',
    value: 'name'
  },
  {
    text: 'Age',
    value: 'age'
  },
  {
    text: 'Email',
    value: 'email'
  },
  {
    text: 'Create At',
    value: 'createAt'
  }
];

const Criteria = ({ dataType, query, onChange, style }) => {
  switch (dataType) {
    case 'string':
      return <StringCriteria query={query} onChange={onChange} style={style} />;
    case 'number':
      return <NumberCriteria query={query} onChange={onChange} style={style} />;
    case 'date':
      return <DateCriteria query={query} onChange={onChange} />;
    default:
      break;
  }
};

const IconToShow = ({ dataType, size }) => {
  switch (dataType) {
    case 'string':
      return <Icon name="user" size={size} />;
    case 'number':
      return <Icon name="user outline" size={size} />;
    case 'date':
      return <Icon name="calendar" size={size} />;
    default:
      break;
  }
};

function showDescription(propName) {
  switch (propName) {
    case '_name':
      return 'Name';
    case '_age':
      return 'Age';
    case '_email':
      return 'Email';
    case '_createAt':
      return 'Create At';
    default:
      break;
  }
}

const structureToOptions = structure =>
  Object.keys(structure).map(option => {
    return {
      text: option,
      value: `_${option}`
    };
  });

const ControlledPropertyList = ({
  structure,
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
        const propName = Object.keys(query)[0];
        const dataType = structure[propName.slice(1)];
        const propQuery = query[propName];
        const value = query[Object.keys(query)[1]];
        return (
          <span>
            <table
              style={{
                tableLayout: 'fixed',
                width: '1000px'
              }}
            >
              <Segment.Group
                horizontal
                style={{
                  marginTop: '-8px',
                  marginBottom: '-10px',
                  height: '70px',
                  width: '1100px'
                }}
              >
                <Segment style={{ width: '50px', margin: 'auto' }}>
                  <IconToShow dataType={dataType} size="large" />
                </Segment>
                <Segment style={{ width: '1090px', padding: 0 }}>
                  <td style={{ fontWeight: 'bold', padding: '20px' }}>
                    {showDescription(propName)}
                  </td>
                  <td>
                    <PropertySelector
                      options={structureToOptions(structure)}
                      value={propName}
                      onChange={onPropertyNameChange(idx)}
                    />
                  </td>
                  <td>
                    <Criteria
                      dataType={dataType}
                      query={propQuery}
                      onChange={onOptionChange(idx)}
                    />
                  </td>
                </Segment>
                <Segment style={{ width: '60px', padding: 0 }}>
                  <Button
                    icon="remove"
                    fluid
                    color="grey"
                    onClick={onRemove(idx)}
                    style={{ height: '70px' }}
                  />
                </Segment>
              </Segment.Group>

              {(() => {
                if (idx < queries.length) {
                  if (propName != '_age') {
                    //query.hasOwnProperty("_value")
                    return (
                      <Grid>
                        <Grid.Row color="facebook">
                          <Grid.Column style={{ width: '50px' }}>
                            <Divider
                              fitted
                              style={{
                                width: '5px',
                                height: '62px',
                                border: 'none',
                                marginLeft: '22px',
                                backgroundColor: '#D3D3D3'
                              }}
                              children={
                                <Label
                                  content="AND"
                                  fluid
                                  style={{
                                    marginLeft: '-22px',
                                    marginTop: '18px',
                                    backgroundColor: '#A9A9A9'
                                  }}
                                />
                              }
                            />
                          </Grid.Column>
                          <Grid.Column
                            style={{
                              marginTop: '20px',
                              marginLeft: '10px',
                              width: '250px'
                            }}
                          >
                            Total Reachable User ≈ {value} {' '}
                            <span className="color">({value}%)</span>
                          </Grid.Column>
                          <Grid.Column
                            style={{
                              marginTop: '17px',
                              width: '700px'
                            }}
                          >
                            <Progress
                              percent={parseFloat(value)}
                              color="blue"
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid>
                        <Grid.Row color="facebook">
                          <Grid.Column style={{ width: '50px' }}>
                            <Divider
                              fitted
                              style={{
                                width: '5px',
                                height: '62px',
                                border: 'none',
                                marginLeft: '17px',
                                backgroundColor: '#D3D3D3'
                              }}
                              children={
                                <Label
                                  content="AND"
                                  fluid
                                  style={{
                                    marginLeft: '-17px',
                                    marginTop: '18px',
                                    backgroundColor: '#A9A9A9'
                                  }}
                                />
                              }
                            />
                          </Grid.Column>
                          <Grid.Column
                            width={15}
                            style={{
                              marginTop: '18px',
                              marginLeft: '10px',
                              width: '230px'
                            }}
                          >
                            <Label color="blue">Sorry! Nothing to Show.</Label>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    );
                  }
                }
                return (
                  <td>
                    <br />
                  </td>
                );
              })()}
            </table>
          </span>
        );
      })}
      <span>
        <Button
          style={{ height: '50px' }}
          icon="add user"
          label={
            <Label>
              <td>
                <Label content="Add filter" icon="filter" />
              </td>
              <td>
                <Dropdown
                  options={options}
                  text={'Select Filter...'}
                  onChange={onAdd}
                  style={{ width: '150px', margin: '10px' }}
                />
              </td>
            </Label>
          }
        />
      </span>
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
      onAdd: PropTypes.func.isRequired,
      onRemove: PropTypes.func.isRequired,
      onPropertyNameChange: PropTypes.func.isRequired,
      style: PropTypes.object.isRequired
    };

    onAdd = (e, { value }) => {
      this.props.onAdd({
        type: 'add',
        value
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

    handlePropertyNameChange = index => propertyName => {
      const { structure, onPropertyNameChange } = this.props;
      let propertyValue;
      switch (structure[propertyName.slice(1)]) {
        case 'string': {
          propertyValue = { $regex: '' };
          break;
        }
        case 'number': {
          propertyValue = { $eq: '' };
          break;
        }
        case 'date': {
          propertyValue = { $gt: moment() };
        }
      }
      const query = { [propertyName]: propertyValue };
      onPropertyNameChange({ query, index });
    };

    render() {
      const { structure, queries, style, groups } = this.props;
      return (
        <WrappedComponent
          structure={structure}
          queries={queries}
          groups={groups}
          style={style}
          onAdd={this.onAdd}
          onRemove={this.onRemove}
          onOptionChange={this.onOptionChange}
          onPropertyNameChange={this.handlePropertyNameChange}
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
      groups: PropTypes.object.isRequired,
      structure: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        queries: this.props.queries
      };
    }

    handleAdd = e => {
      let newQueries = this.state.queries.slice();
      switch (e.value) {
        case 'name': {
          newQueries.push({ _name: { $eq: '' } });
          break;
        }
        case 'email': {
          newQueries.push({ _email: { $eq: '' } });
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
            }
          });
          break;
        }
        default:
          break;
      }

      this.setState({ queries: newQueries });
    };

    handleRemove = e => {
      let newQueries = this.state.queries.slice();
      newQueries.splice(e.index, 1);
      this.setState({ queries: newQueries });
    };

    handleOptionChange = e => {
      let newQueries = this.state.queries.slice();
      const propName = Object.keys(this.state.queries[e.index])[0];
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
          query = { [propName]: { [operator]: '' } };
        } else {
          query = {
            [propName]: { [operator]: value }
          };
        }
      } else {
        query = { [propName]: { $gt: value[0], $lt: value[1] } };
      }
      newQueries.splice(e.index, 1, query);
      this.setState({ queries: newQueries });
    };

    handlePropertyNameChange = e => {
      let newQueries = this.state.queries.slice();
      newQueries.splice(e.index, 1, e.query);
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
          onAdd={this.handleAdd}
          onRemove={this.handleRemove}
          onChange={this.handleOptionChange}
          onPropertyNameChange={this.handlePropertyNameChange}
          style={style}
        />
      );
    }
  };

const PropertyList = control(ControlledPropertyList);

const TestProperty = container(PropertyList);

export { PropertyList, ControlledPropertyList, TestProperty };
