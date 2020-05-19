import React from 'react';
import { Table, Header } from 'semantic-ui-react';
interface TableRowProps {
    title: string;
    content: string | number;
}
const TableRow: React.FC<TableRowProps> = ({ title, content }) => {
    return (
        <Table.Row>
            <Table.Cell>
                <Header as='h4' >
                    <Header.Content>
                        {title}
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{content}</Table.Cell>
        </Table.Row>
    );
};
export default TableRow;