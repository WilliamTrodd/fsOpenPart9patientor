/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardContent, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Entry from "../components/EntryView";
import { apiBaseUrl } from "../constants";
import { currentPatient, useStateValue } from "../state";
import { Diagnoses, Patient } from "../types";

//import axios from "axios";

const PatientViewPage = () => {

  const [{patient, diagnoses}, dispatch] = useStateValue();
  const { id } = useParams<{id: string}>();

  
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
      {patient.entries.map(e => <Entry key={e.id} entry={e} diagnoses={diagnoses}/>)}
      </div>
    </div>
  );
};


export default PatientViewPage;