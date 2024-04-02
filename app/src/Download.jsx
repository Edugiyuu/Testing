
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
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        console.log(valuesArray);
        setDataLoaded(true);
      },
    });
  };
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#ffffff'
    },
    section: {
      margin: 10,
      flexDirection:'column',
      flexGrow: 1,
      fontSize: 10,
    },
    valoresView:{
      display:'flex',
      flexDirection:'row',
      fontSize: '9px',
      justifyContent:'flex-start',
      gap:'16px'
    },
    valores: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '7px',
      justifyContent: 'space-between',
      gap: '26px',
      border: '2px solid rgb(0, 0, 0)',
      borderRadius: '5px',
      padding:'10px'
    },
    
    colunaView:{
      display:'flex',
      flexDirection:'row',
     
      gap:'70px'
    },
    coluna:{
      
      fontSize:'12px',
      marginLeft:'10px',
      marginTop:'10px'
    },
  });
  const MyDoc = () => (
    <Document>
      <Page size="A3">
        <View>
          <Text>Valores</Text>
        </View>
        <View style={styles.colunaView} >
        {rowsArray[0].map((colunas) => {
              return <Text style={styles.coluna}>{colunas}</Text> 
            })}
        </View>
        <View style={styles.section}>
          {/* <Text>{valuesArray}</Text> */}
          {valuesArray.map((valor, index) => {
            return (
              <View style={styles.valoresView} key={index}>
                {valor.map((valor, i) => {
                  return <Text style={styles.valores} key={i}>{valor}</Text>;
                })}
              </View>
            );
          })}
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
