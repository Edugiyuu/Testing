// Download.jsx

import React, { useState } from 'react';
import Papa from "papaparse";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export const rowsArray = [];
export const valuesArray = [];

export function Download() {
  /* const [valuesArrays, setValuesArrays] = useState([]); */
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleFileChange = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        results.data.forEach((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setDataLoaded(true);
      },
    });
  };

  const MyDoc = () => (
    <Document>
      <Page size="A4">
        <View>
          <Text>Section #1</Text>
        </View>
        <View>
          <Text>Section #2</Text>
        </View>
        <View>
          <Text>{valuesArray.toString()}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className='download' >
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        accept=".csv"
      />
      {dataLoaded && (
        <PDFDownloadLink className='clickDownload'document={<MyDoc />} fileName="algo.pdf">
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      )}
    </div>
  );
}

export default Download;
