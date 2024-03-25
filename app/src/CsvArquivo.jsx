import React, { useState } from 'react';


const CsvArquivo = () => {


  return (
    <input
        type="file"
        name="file"
        onChange={handleFileChange}
        accept=".csv"
      />
  );
};

export default CsvArquivo;