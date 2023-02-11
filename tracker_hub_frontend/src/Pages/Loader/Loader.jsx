import { AcUnit } from '@material-ui/icons';
import React from 'react';
import './Loader.css';

function Loader(props) {
  return (
    <div className="main_block" style={{display:`${props.visibility}`}}>
        <AcUnit className="spin"/>
        <p className="loading">Loading .......</p>
    </div>
  )
}

export default Loader