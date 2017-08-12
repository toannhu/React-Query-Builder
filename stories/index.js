import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';

import { ControlledSelect, Select } from '../src/components/Select.jsx';
import {
  NumberCriteria,
  ControlledNumberCriteria,
  TestNumber
} from '../src/components/NumberCriteria';
import {
  StringCriteria,
  ControlledStringCriteria,
  TestString
} from '../src/components/StringCriteria';
import {
  ControlledDateCriteria,
  DateCriteria
} from '../src/components/DateCriteria';
import {
  ControlledEventFrequencyCriteria,
  EventFrequencyCriteria,
  TestEventFrequency
} from '../src/components/EventFrequencyCriteria';
import {
  TestPropertySelector,
  PropertySelector,
  ControlledPropertySelector
} from '../src/components/PropertySelector';
import {
  ControlledPlatformMatch,
  PlatformMatch,
  TestPlatformMatch
} from '../src/components/Platform';
import {
  EventList,
  ControlledEventList,
  TestEventList
} from '../src/components/EventList';
import {
  PropertyList,
  ControlledPropertyList,
  TestProperty
} from '../src/components/PropertyList';
import {
  QueryBuilder,
  ControlledQueryBuilder
} from '../src/components/QueryBuilder';
import 'semantic-ui-css/semantic.min.css';

storiesOf('Welcome', module).add('to Storybook', () =>
  <Welcome showApp={linkTo('Button')} />
);

storiesOf('Button', module)
  .add('with text', () =>
    <Button onClick={action('clicked')}>Hello Button</Button>
  )
  .add('with some emoji', () =>
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  );

storiesOf('EnhancedSelect', module)
  .add('controlled', () =>
    <div>
      <ControlledSelect
        open
        value="account_property.email"
        activeGroup={1}
        groups={groups}
        onTabClick={action('tab_clicked')}
        onItemClick={action('item_clicked')}
        style={{ width: 300 }}
      />
    </div>
  )
  .add('uncontrolled', () =>
    <Select
      value="account_property.email"
      groups={groups}
      onChange={action('value_changed')}
      style={{ width: 300 }}
    />
  );

storiesOf('Number Criteria', module)
  .add('Controlled Number', () =>
    <ControlledNumberCriteria
      query={{ $gt: 10 }}
      open={false}
      onOperatorClick={action('operator_changed')}
      onValueClick={action('value_changed')}
      onLeftValueClick={action('left_value_changed')}
      onRightValueClick={action('right_value_changed')}
      style={{ margin: '10px' }}
    />
  )
  .add('Uncontrolled Number', () =>
    <NumberCriteria
      query={{ $gt: 10, $lt: 20 }}
      onChange={action('value_changed')}
      style={{ margin: '10px' }}
    />
  )
  .add('Test Number', () =>
    <TestNumber onChange={action('value_changed')} style={{ margin: '10px' }} />
  );

storiesOf('String Criteria', module)
  .add('Controlled String', () =>
    <ControlledStringCriteria
      query={{ $eq: 'React/Redux' }}
      open={false}
      onValueChange={action('value_changed')}
      onOperatorChange={action('operator_changed')}
      style={{ margin: '10px' }}
    />
  )
  .add('String', () =>
    <StringCriteria
      query={{ $eq: 'React/Redux' }}
      onChange={action('String Criteria')}
      style={{ margin: '10px' }}
    />
  )
  .add('Test String', () =>
    <TestString
      query={{ $eq: 'React/Redux' }}
      onChange={action('value_changed')}
      style={{ margin: '10px' }}
    />
  );

storiesOf('Date Criteria', module)
  .add('Controlled Date', () =>
    <ControlledDateCriteria
      query={{ $lt: '2017-07-17T17:00:00.000Z' }}
      style={{ margin: '10px' }}
    />
  )
  .add('Uncontrolled Date', () =>
    <DateCriteria
      onChange={action('DateCriteria')}
      query={{
        $gt: '2017-07-15T17:00:00.000Z',
        $lt: '2017-07-17T17:00:00.000Z'
      }}
      style={{ margin: '10px' }}
    />
  );

storiesOf('Event Frequency Criteria', module)
  .add('Controlled Performed', () =>
    <ControlledEventFrequencyCriteria
      query={{
        type: 'performed',
        frequency: { type: '$within', days: 90 },
        query: { name: '_signin' }
      }}
      onActionTypeChange={action('Action Type Change')}
      onFrequencyTypeChange={action('Frequency Type Change')}
      onTimesGtChange={action('From Time Change')}
      onTimesLtChange={action('To Time Change')}
      onDaysValueChange={action('Day Value Change')}
    />
  )
  .add('Uncontrolled Performed', () =>
    <EventFrequencyCriteria
      query={{
        type: 'not_performed',
        frequency: { type: '$within', days: 90 },
        query: { name: '_signin' }
      }}
      onChange={action('Event Change')}
    />
  )
  .add('Test Performed', () =>
    <TestEventFrequency
      query={{
        type: 'performed',
        frequency: { type: '$within', days: 90 },
        query: { name: '_signin' }
      }}
      onChange={action('Event Change')}
    />
  );

storiesOf('Platform Match', module)
  .add('Controlled Platform Match', () =>
    <ControlledPlatformMatch
      open={true}
      onChange={action('operator_changed')}
      onPlatformChange={idx => action('plaform_changed')}
      style={{ margin: '10px' }}
    />
  )
  .add('Platform Match', () =>
    <PlatformMatch
      onChange={action('Event Change')}
      style={{ margin: '10px' }}
    />
  )
  .add('Test Platform Match', () =>
    <TestPlatformMatch
      onChange={action('Event Change')}
      style={{ margin: '10px' }}
    />
  );

storiesOf('PropertySelector', module)
  .add('Controlled', () =>
    <ControlledPropertySelector value={'_name'} options={options(structure)} />
  )
  .add('Uncontrolled', () =>
    <PropertySelector
      options={options(structure)}
      value={'_name'}
      onChange={action()}
    />
  )
  .add('Test', () =>
    <TestPropertySelector
      options={options(structure)}
      value={'_name'}
      onChange={action()}
    />
  );

storiesOf('Event List', module)
  .add('Controlled Event List', () =>
    <ControlledEventList
      queries={[
        {
          type: 'not_performed',
          frequency: { type: '$within', days: 90 },
          query: { name: '_signin' }
        },
        {
          type: 'performed',
          frequency: { type: '$within', days: 90 },
          query: { name: '_signin' }
        }
      ]}
      structure={structure}
      groups={groups}
      onAdd={action('Property add')}
      onRemove={idx => action('Property remove')}
      onOptionChange={idx => action('Property options change')}
      onPropertyNameChange={idx => action('Property name change')}
      style={{ margin: '10px' }}
    />
  )
  .add('Uncontrolled Event List', () =>
    <EventList
      queries={[
        {
          type: 'not_performed',
          frequency: { type: '$within', days: 90 },
          query: { name: '_signin' }
        },
        {
          type: 'performed',
          frequency: { type: '$within', days: 90 },
          query: { name: '_signin' }
        }
      ]}
      groups={groups}
      onChange={action('Option change')}
      onAdd={action('Property add')}
      onRemove={action('Property remove')}
      onPropertyNameChange={action('Property Name change')}
      style={{ margin: '10px' }}
    />
  )
  .add('Test Event List', () =>
    <TestEventList
      queries={[
        {
          type: 'not_performed',
          frequency: { type: '$within', days: 90 },
          query: { name: '_signin' }
        },
        {
          type: 'performed',
          frequency: { type: '$within', days: 90 },
          query: { name: '_signin' }
        }
      ]}
      groups={groups}
      onChange={action('Property List change')}
      style={{ margin: '10px' }}
    />
  );

storiesOf('Property List', module)
  .add('Controlled Property List', () =>
    <ControlledPropertyList
      queries={[
        { _name: { $eq: 'Tom' } },
        { _name: { $ne: 'Jerry' } },
        { _age: { $gt: 10, $lt: 20 } },
        {
          _createAt: {
            $gt: '2017-07-15T17:00:00.000Z',
            $lt: '2017-07-17T17:00:00.000Z'
          }
        }
      ]}
      structure={structure}
      groups={groups}
      onAdd={action('Property add')}
      onRemove={idx => action('Property remove')}
      onOptionChange={idx => action('Property options change')}
      onPropertyNameChange={idx => action('Property name change')}
      style={{ margin: '10px' }}
    />
  )
  .add('Uncontrolled Property List', () =>
    <PropertyList
      queries={[
        { _name: { $eq: 'Tom' } },
        { _name: { $ne: 'Jerry' } },
        { _age: { $gt: 10, $lt: 20 } },
        {
          _createAt: {
            $gt: '2017-07-15T17:00:00.000Z',
            $lt: '2017-07-17T17:00:00.000Z'
          }
        }
      ]}
      structure={structure}
      groups={groups}
      onChange={action('Option change')}
      onAdd={action('Property add')}
      onRemove={action('Property remove')}
      onPropertyNameChange={action('Property Name change')}
      style={{ margin: '10px' }}
    />
  )
  .add('Test Property List', () =>
    <TestProperty
      queries={[
        { _name: { $eq: 'Tom' } },
        { _name: { $ne: 'Jerry' } },
        { _age: { $gt: 10, $lt: 20 } },
        {
          _createAt: {
            $gt: '2017-07-15T17:00:00.000Z',
            $lt: '2017-07-17T17:00:00.000Z'
          }
        }
      ]}
      structure={structure}
      groups={groups}
      onChange={action('Property List change')}
      style={{ margin: '10px' }}
    />
  );

storiesOf('Query Builder', module).add('Final Query Builder', () =>
  <QueryBuilder
    queries={{
      logical_criteria: '$and',
      profile_criteria: [
        { _name: { $eq: 'Tom' }, _value: 20.5 },
        { _name: { $ne: 'Jerry' } },
        { _email: { $eq: 'abc@gmail.com' }, _value: 50.6 },
        { _age: { $gt: 10, $lt: 20 } },
        {
          _createAt: {
            $gt: '2017-07-15T17:00:00.000Z',
            $lt: '2017-07-17T17:00:00.000Z'
          },
          _value: 60
        }
      ],
      event_criteria: [
        {
          type: 'not_performed',
          frequency: { type: '$within', days: 90 },
          query: { name: '_signin' }
        },
        {
          type: 'performed',
          frequency: { type: '$within', days: 90 },
          query: { name: '_signin' }
        }
      ]
    }}
    structure={structure}
    groups={groups}
    onChange={action('Property List change')}
    style={{ margin: '10px' }}
  />
);

const options = structure =>
  Object.keys(structure).map(property => {
    return { text: property, value: `_${property}` };
  });

const structure = {
  name: 'string',
  email: 'string',
  age: 'number',
  createAt: 'date'
};

const groups = [
  {
    text: 'Event',
    value: 'event',
    options: [
      { value: 'signin', text: 'Sign in' },
      { value: 'signup', text: 'Sign up' },
      { value: 'page_view', text: 'Page view' },
      { value: 'content_liked', text: 'Content liked' },
      { value: 'content_consumed', text: 'Content consumed' },
      { value: 'content_favourited', text: 'Content favourited' }
    ]
  },
  {
    text: 'Account',
    value: 'account_property',
    options: [
      { value: 'name', text: 'Name', icon: 'font' },
      {
        value: 'email',
        text: 'Email',
        icon: 'font',
        description: 'Registered email'
      },
      { value: 'country', text: 'Country', icon: 'font' },
      { value: 'is_subscribed', text: 'Subscribed', icon: 'selected radio' },
      { value: 'createdAt', text: 'Created date', icon: 'calendar' }
    ]
  },
  {
    text: 'Profile',
    value: 'profile_property',
    options: [
      { value: 'name', text: 'Name', icon: 'font' },
      { value: 'email', text: 'Email', icon: 'font' },
      { value: 'age', text: 'Age', icon: 'hashtag' },
      { value: 'createdAt', text: 'Created date', icon: 'calendar' }
    ]
  }
];
