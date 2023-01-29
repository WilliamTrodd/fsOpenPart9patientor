/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardContent, Typography, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import Entry from "../components/EntryView";
import { apiBaseUrl } from "../constants";
import { currentPatient, modifyPatient, useStateValue } from "../state";
import { Diagnoses, Patient } from "../types";

//import axios from "axios";

const PatientViewPage = () => {

  const [{patient, diagnoses}, dispatch] = useStateValue();
  const { id } = useParams<{id: string}>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  
  React.useEffect(() => {

    const setPatient = async (id: string) => {
      try{
        const {data: foundPatient} = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(currentPatient(foundPatient));
      } catch (e: unknown) {
        console.log(e);
      }
    };
    
    if(!patient || id !== patient.id){
      void setPatient(id as string);
    }
  },[]);

  if(!patient){
    return(<div>loading</div>);
  }

  const cardStyle = {
    minWidth: '250px',
    display: 'inline-block'
  };

  const submitEntry = async (values: EntryFormValues) => {
    try{
      const {data: updatedPatient} = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        values
      );
      console.log(values);
      dispatch(modifyPatient(updatedPatient));
    } catch (e: unknown) {
      if(axios.isAxiosError(e)) {
        console.log(e?.response?.data || "Unrecognized axios error");
      } else {
        console.log('Unknown error', e);
      }
    }
  };

  return(
    <div>
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h5">{patient.name} {patient.gender==='male' ? <MaleIcon /> : <FemaleIcon />}</Typography> 
          <Typography variant="body2">SSN: {patient.ssn}</Typography>
          <Typography variant="body1">Occupation: {patient.occupation}</Typography>
        </CardContent>
      </Card>
      <Typography variant="h6">Entries</Typography>
      <div style={{display: 'flex', flexDirection:'column'}}>
      {patient.entries.map(e => <Entry key={e.id} entry={e}/>)}
      </div>
      <AddEntryModal 
        modalOpen={modalOpen} 
        onSubmit={submitEntry} 
        onClose={closeModal} 
        error={error}/>
        <Button variant="contained" onClick={() => openModal()}>
          Add new entry
        </Button>
    </div>
  );
};


export default PatientViewPage;