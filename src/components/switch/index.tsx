import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { updateStatus } from 'pages/courses/coursesFunct';

interface IProps {
    id:number;
    url:string;
    apiStatus:boolean
}

export default function SwitchStatus({id,url,apiStatus}:IProps) {
console.log(apiStatus)
    const [status,setStatus] = React.useState(apiStatus)
  return (
    <FormGroup>
 
        <Switch onChange={()=>{
            setStatus(prev => !prev)
            updateStatus(id,url,status)
            }
            } />

    </FormGroup>
  );
}