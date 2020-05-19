import React from 'react';
import { Entry } from '../types';
import { Table, Header, Container, Segment, Icon } from 'semantic-ui-react';
import Diagnosis from './Diagnosis';
import EntryDetails from './EntryDetails';


interface EntriesProps {
    entries: Array<Entry>;
}

const Entries: React.FC<EntriesProps> = ({ entries }) => {

    return <Container >
        <Header content="Entries:" />
        {entries.map(entry =>
            <Segment key={entry.id} raised >
                <Container style={{ padding: "40px 0" }} >
                    <Table celled basic='very'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell >
                                    <Header content={entry.date} />
                                </Table.Cell>
                                <Table.Cell>
                                    {entry.description}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    <Header>
                        <Icon name="user md" />Secialist: {entry.specialist}
                    </Header>
                    {entry?.diagnosisCodes && <Diagnosis diagnosisCodes={entry?.diagnosisCodes} />}

                    <EntryDetails entry={entry} />
                </Container>
            </Segment>)
        }
    </Container >;

};
export default Entries;