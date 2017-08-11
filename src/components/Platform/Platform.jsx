import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  Checkbox,
  Image,
  Input,
  Container,
  Table,
  Button,
  Grid
} from 'semantic-ui-react';

import './Platform.css';

const options = [
  {
    name: 'FOX+',
    platform: 'Android',
    value: true,
    srcUrl:
      'https://lh3.googleusercontent.com/drEZwJ4yRdrnNtPNx1xRMFequbJ8_ZhjgtvFk0ChY6V2cYMfej6f8HNgOgx_G4NBR74=w300'
  },
  {
    name: 'FOX+',
    platform: 'iOS',
    value: true,
    srcUrl:
      'https://lh3.googleusercontent.com/drEZwJ4yRdrnNtPNx1xRMFequbJ8_ZhjgtvFk0ChY6V2cYMfej6f8HNgOgx_G4NBR74=w300'
  },
  {
    name: 'FOX+',
    platform: 'Web',
    value: true,
    srcUrl:
      'http://sire-assets-fox.fichub.com/assets/fox/images/misc/apple-touch-icon.png?1501684406'
  }
];

const PlatformCheckBox = ({ name, platform, srcUrl, onPlatformChange }) => {
  return (
    <span style={{ marginRight: '20px' }}>
      <td
        style={{
          textAlign: 'center',
          verticalAlign: 'middle'
        }}
      >
        <Checkbox onChange={onPlatformChange} />
      </td>
      <td>
        <div className="foo">
          <div className="a">
            {name}
          </div>
          <div className="b">
            <Image
              src={srcUrl}
              size="mini"
              shape="rounded"
              style={{
                top: '20%',
                margin: 'auto'
              }}
            />
          </div>
          <div className="c">
            {platform}
          </div>
        </div>
      </td>
    </span>
  );
};

const ControlledPlatformMatch = ({
  open = false,
  onChange,
  onPlatformChange,
  style
}) => {
  return (
    <div style={{ margin: '18px' }}>
      <span style={{ fontWeight: 'bold' }}>App Used</span>
      <Checkbox
        label="Include users from all apps"
        defaultChecked
        onChange={onChange}
        style={{ marginLeft: '50px' }}
      />
      <tr>
        {(() => {
          if (open)
            return (
              <div>
                <table
                  style={{
                    tableLayout: 'fixed',
                    width: '600px',
                    marginTop: '15px'
                  }}
                >
                  {options.map(({ name, platform, srcUrl }, idx) => {
                    return (
                      <PlatformCheckBox
                        name={name}
                        platform={platform}
                        defaulChecked={false}
                        srcUrl={srcUrl}
                        onPlatformChange={onPlatformChange(idx)}
                      />
                    );
                  })}
                </table>
              </div>
            );
        })()}
      </tr>
    </div>
  );
};

const control = WrappedComponent =>
  class extends Component {
    static propTypes = {
      onChange: PropTypes.func.isRequired,
      onPlatformChange: PropTypes.func.isRequired,
      style: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        open: false
      };
    }

    handleClick = (e, { checked }) => {
      this.setState({ open: !this.state.open });
      this.props.onChange({ checked });
    };

    handlePlatformChange = index => (e, { checked }) => {
      this.props.onPlatformChange({
        type: 'change',
        index,
        checked
      });
    };

    render() {
      const { open } = this.state;
      const { style } = this.props;
      return (
        <WrappedComponent
          open={open}
          onChange={this.handleClick}
          onPlatformChange={this.handlePlatformChange}
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
        queries: { platforms: options }
      };
    }
    handleChange = e => {
      const queries = this.state.queries;
      let newQueries = [];
      Object.values(queries)[0].map((query, index) => {
        newQueries.push(Object.assign({}, { ...query }, { value: e.checked }));
      });
      this.setState({ queries: { platforms: newQueries } });
      this.props.onChange(newQueries);
    };

    handlePlatformChange = e => {
      let newQueries = Object.values(this.state.queries)[0];
      newQueries[e.index].value = e.checked;
      this.setState({ queries: { platforms: newQueries } });
      this.props.onChange(newQueries);
    };

    render() {
      const { style } = this.props;
      return (
        <WrappedComponent
          onChange={this.handleChange}
          onPlatformChange={this.handlePlatformChange}
          style={style}
        />
      );
    }
  };

const PlatformMatch = control(ControlledPlatformMatch);

const TestPlatformMatch = container(PlatformMatch);

export { ControlledPlatformMatch, PlatformMatch, TestPlatformMatch };
