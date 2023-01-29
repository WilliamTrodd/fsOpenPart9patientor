import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import { Grid} from '@material-ui/core';
import { Card, Typography, CardContent } from "@mui/material";
//import Divider from '@mui/material/Divider';
import React from "react";
import { Entry, 
  Diagnoses, 
  EntryType, 
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating
} from "../types";
import { useStateValue } from '../state';

let cardStyle = {
  display: 'inline-block',
  minWidth: '30%', 
  margin: '5px 5px 5px 5px',
  background: '#ffffff'
};

const assertNever = (value: never): never =>{
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalView = ({entry}: {entry: HospitalEntry}) => (
  <>

<Grid container direction="row" justifyContent='flex-start' alignItems='center' style={{paddingBottom: "5px"}}>
    <Grid item xs={11}><Typography variant="h5">Hospital Visit</Typography></Grid>
    <Grid item xs={1} style={{textAlign:"center"}} >
      <LocalHospitalIcon />
    </Grid>
    {entry.discharge ? <><Grid item xs={12}>Discharge Date: {entry.discharge.date}</Grid> <Grid item xs={12}>Discharge Criteria: {entry.discharge.criteria}</Grid> </> : <></>}
  </Grid>
  </>
);

const HealthCheckView = ({entry}: {entry: HealthCheckEntry}) => {
  const renderIcon = (rating: HealthCheckRating) => {
    switch(rating){
      case(HealthCheckRating.Healthy):
        return <CheckBoxIcon />;
      case(HealthCheckRating.LowRisk):
        return <ThumbsUpDownIcon />;
      case(HealthCheckRating.HighRisk):
        return <ThumbDownOffAltIcon />;
      case(HealthCheckRating.CriticalRisk):
        return <ThumbDownIcon />;
      default:
        return <></>;
    }
  };
  return (
  <Grid container direction="row" justifyContent='flex-start' alignItems='center'>
    <Grid item xs={11}><Typography variant="h5">Health Check</Typography></Grid>
    <Grid item xs={1} style={{textAlign:"center"}} >
      {renderIcon(entry.healthCheckRating)}
    </Grid>
  </Grid>
);};

const OccupationalView = ({entry}: {entry: OccupationalHealthcareEntry}) => (
  <Grid container direction="row" justifyContent='flex-start' alignItems='center'>
    <Grid item xs={9}><Typography variant="h5">Occupational Healthcare</Typography></Grid>
    <Grid item xs={2} style={{textAlign:"center"}}>{entry.employerName}</Grid>
    <Grid item xs={1} style={{textAlign:"center"}} ><ReceiptLongIcon /></Grid>
    {entry.sickLeave 
      ? <Grid container direction="column" justifyContent='center' alignItems="flex-start" style={{padding: '5px'}}>
        <Grid item style={{textAlign:"left"}}><Typography>Sick Leave:</Typography></Grid>
        <Grid item style={{textAlign:"left"}}>
          <Typography>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography>
        </Grid>
        </Grid>
      : <Typography>N/A</Typography>}
    </Grid>
  );
/* TODO AHHHH UI/UX */
const EntryStructure = ({entry, diagnoses, cardElement}: {entry: Entry, diagnoses: Diagnoses[], cardElement: JSX.Element}) => {
      
  return(    
      <Card style={cardStyle}>
        <CardContent>
        {cardElement}
        <Typography variant="body2">{entry.description}</Typography> <Typography></Typography>
        <Typography sx={{paddingTop: '10px'}}>Diagnoses:</Typography>
        <ul>
          <Typography variant="body2"> 
            {entry.diagnosisCodes?.map(c => <li key={c}>{c} - {Object.values(diagnoses).filter((d: Diagnoses) => d.code === c)[0].name}</li>)}
          </Typography>
        </ul>
        </CardContent>
      </Card>
  );
};

const EntryView: React.FC<{entry: Entry}> = ({entry}: {entry: Entry}) => {
  const [{diagnoses}] = useStateValue();

  switch (entry.type) {
    case EntryType.Hospital:
      cardStyle = {...cardStyle, background: '#ffd7db'};
      return (<EntryStructure entry={entry} diagnoses={diagnoses} cardElement={<HospitalView entry={entry}/>} />);
    case EntryType.HealthCheck:
      cardStyle = {...cardStyle, background: '#c2eafc'};
      return (<EntryStructure entry={entry} diagnoses={diagnoses} cardElement={<HealthCheckView entry={entry}/>} />);
    case EntryType.Occupational:
      cardStyle = {...cardStyle, background: '#d3ebd3'};
      return (<EntryStructure entry={entry} diagnoses={diagnoses} cardElement={<OccupationalView entry={entry}/>} />);
    default:
      return assertNever(entry);
  }
};

export default EntryView;