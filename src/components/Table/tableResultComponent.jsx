import React, { Component } from 'react';
import { Table, Container } from 'semantic-ui-react';

import './tableResultComponent.css';

const DumpTableComponent = ({ queries }) => {
  const tableTwoCol = queries.every(queyry => {
    return queyry['value'] == false;
  });
  //console.log(tableTwoCol);
  return (
    <div>
      <Table
        stackable={false}
        celled
        definition
        fixed={false}
        className="fixedTable"
      >
        <Table.Header>
          {!tableTwoCol
            ? <Table.Row style={{ width: '10px' }}>
                <Table.HeaderCell className="result " />
                <Table.HeaderCell className="total cellEmphasis">
                  Total
                </Table.HeaderCell>

                <Table.HeaderCell className="email cellEmphasis">
                  Email
                </Table.HeaderCell>
                <Table.HeaderCell className="androidPush cellEmphasis">
                  AndroidPush
                </Table.HeaderCell>
                <Table.HeaderCell className="iosPush cellEmphasis">
                  IOS Push
                </Table.HeaderCell>
                <Table.HeaderCell className="web cellEmphasis">
                  WEB
                </Table.HeaderCell>
              </Table.Row>
            : <Table.Row>
                {' '}<Table.HeaderCell className="result " />
                <Table.HeaderCell className="total cellEmphasis">
                  Total
                </Table.HeaderCell>
              </Table.Row>}
        </Table.Header>

        <Table.Body>
          {!tableTwoCol
            ? <Table.Row>
                <Table.Cell className="cellEmphasis">
                  {' '}Reachable user
                </Table.Cell>
                <Table.Cell>1 </Table.Cell>
                <Table.Cell>2 </Table.Cell>
                <Table.Cell> 3</Table.Cell>
                <Table.Cell> 4</Table.Cell>
                <Table.Cell>5 </Table.Cell>
              </Table.Row>
            : <Table.Row>
                <Table.Cell className="cellEmphasis">
                  {' '}Reachable user
                </Table.Cell>
                <Table.Cell>1 </Table.Cell>
              </Table.Row>}
        </Table.Body>
      </Table>
    </div>
  );
};
export { DumpTableComponent };
