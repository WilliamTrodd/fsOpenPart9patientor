import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Card, Typography, CardContent } from "@mui/material";
import Divider from '@mui/material/Divider';
import React from "react";
import { Entry, Diagnoses } from "../types";

type EntryViewProps = {
  entry: Entry;
  diagnoses: Diagnoses[];
};

const cardStyle = {
  display: 'inline-block',
  minWidth: '30%', 
  margin: '5px 5px 5px 5px' 
};

const assertNever = (value: never): never =>{
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalView: React.FC<{entry: Entry, diagnoses: Diagnoses[]}> = ({entry, diagnoses}: EntryViewProps) => (
  <Card style={cardStyle}>
          <CardContent>
          <Typography variant="subtitle1">{entry.description}</Typography> 
          <Divider textAlign="right" flexItem><Typography variant="body2">{entry.date} -- <LocalHospitalIcon /></Typography></Divider>
          <ul>
            <Typography variant="body1"> 
              {entry.diagnosisCodes?.map(c => <li key={c}>{c} - {Object.values(diagnoses).filter((d: Diagnoses) => d.code === c)[0].name}</li>)}
            </Typography>
          </ul>
          </CardContent>
        </Card>
);

const HealthCheckView: React.FC<{entry: Entry, diagnoses: Diagnoses[]}> = ({entry, diagnoses}: EntryViewProps) => (
  <Card style={cardStyle}>
    <CardContent>
    <Typography variant="subtitle1">{entry.description}</Typography> <Typography variant="subtitle1" align='right'><CheckBoxIcon /></Typography>
    <Divider textAlign="right" flexItem><Typography variant="body2">{entry.date}</Typography></Divider>
    <ul>
      <Typography variant="body1"> 
        {entry.diagnosisCodes?.map(c => <li key={c}>{c} - {Object.values(diagnoses).filter((d: Diagnoses) => d.code === c)[0].name}</li>)}
      </Typography>
    </ul>
    </CardContent>
  </Card>

);

const OccupationalView: React.FC<{entry: Entry, diagnoses: Diagnoses[]}> = ({entry, diagnoses}: EntryViewProps) => (
  <Card style={cardStyle}>
    <CardContent>
    <Typography variant="subtitle1"  >{entry.description}</Typography> <Typography variant="subtitle1" align='right'><ReceiptLongIcon /></Typography>
    <Divider textAlign="right" flexItem><Typography variant="body2">{entry.date}</Typography></Divider>
    <ul>
      <Typography variant="body1"> 
        {entry.diagnosisCodes?.map(c => <li key={c}>{c} - {Object.values(diagnoses).filter((d: Diagnoses) => d.code === c)[0].name}</li>)}
      </Typography>
    </ul>
    </CardContent>
  </Card>
);


const EntryView: React.FC<{entry: Entry, diagnoses: Diagnoses[]}> = ({entry, diagnoses}: EntryViewProps) => {

  switch (entry.type) {
    case "Hospital":
      return <HospitalView entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
      return <HealthCheckView entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalView entry={entry} diagnoses={diagnoses}/>;
    default:
      return assertNever(entry);
  }

  return(
  <Card style={cardStyle}>
    <CardContent>
    <Typography variant="subtitle1">{entry.description}</Typography>
    <Divider textAlign="right" flexItem><Typography variant="body2">{entry.date}</Typography></Divider>
    <ul>
      <Typography variant="body1"> 
        {entry.diagnosisCodes?.map(c => <li key={c}>{c} - {Object.values(diagnoses).filter((d: Diagnoses) => d.code === c)[0].name}</li>)}
      </Typography>
    </ul>
    </CardContent>
  </Card>);
};

export default EntryView;