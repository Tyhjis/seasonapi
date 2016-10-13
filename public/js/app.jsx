import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import VegetableBox from './vegs.jsx';
import SeasonList from './listBySeason.jsx';
import SeasonBox from './seasons.jsx';

ReactDOM.render(<SeasonList url="api/seasons" />, document.getElementById('appRoot'));
//ReactDOM.render(<VegetableBox url="/api/vegetables" />, document.getElementById('vegetablecontainer'));
