import React, { useState } from 'react';


import Download from './Download';

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Download2 from './Download2';
const Home = () => {


  return (
    <div>
 
     {/*  <DownloadPDF/> */}
      <Download/>
      <Download2/>
    </div>
  );
};

export default Home;
