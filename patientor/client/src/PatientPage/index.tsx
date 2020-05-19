import React from "react";
import axios from "axios";
import { Table, Item, Button } from "semantic-ui-react";
import Loader from "../components/Loader";


import { Patient, Diagnose, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { getPatientDetails, setDiagnosisList, addEntry } from "../state/reducer";
import { useParams } from "react-router-dom";
import GenderIcon from "./GenderIcon";
import Entries from "./Entries";
import TableRow from '../components/TableRow';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
import { toNewEntry, toEntry } from "../utils";

const PatientPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnosis }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewEntry = async (values: EntryFormValues) => {
    await axios.get<void>(`${apiBaseUrl}/ping`);
    try {
      const validNewEntry = toNewEntry(values);
      const { data: entry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        validNewEntry
      );
      const validEntry = toEntry(entry);
      dispatch(addEntry(id, validEntry));
      closeModal();
    } catch (e) {
      // console.error(e.response.data);
      // console.error(e.response.data);
      setError(e.message);
      // setError(e.response.data.error);
    }
  };


  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(getPatientDetails(patient));
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };

    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosis } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosisList(diagnosis));
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };

    if (!patients[id]?.ssn) { fetchPatient(); }
    console.log(Object.keys(diagnosis));
    if (!(Object.keys(diagnosis).length > 0)) { fetchDiagnosis(); }
  }, [dispatch]);

  if (!patients[id]) {
    return <Loader />;
  }
  const { [id]: patient } = patients;

  return (
    <div className="App">
      <Item.Group>
        <Item>

          <Item.Image size='tiny' src={`/assets/${patient.gender}.jpg`} />
          <Item.Content verticalAlign='middle'>
            <Item.Header as="h2">
              {patient.name}<GenderIcon gender={patient.gender} />
            </Item.Header>
          </Item.Content>
        </Item>
        <Item>
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Patient details</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {patient.ssn && <TableRow title="ssn" content={patient.ssn} />}
              <TableRow title="Occupation" content={patient.occupation} />
            </Table.Body>
          </Table>
        </Item>
        <Item>
          {patient?.entries && <Entries entries={patient.entries} />}
        </Item>
      </Item.Group>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
