import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { S3 } from 'aws-sdk';
import styles from './Member.module.scss';

const Member = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected File:', file);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
        // Set your AWS credentials
        AWS.config.update({
          accessKeyId: 'ASIAWIGGIHCI7JBMF4FW',
          secretAccessKey: 'uUAGIpVOl4m+ZvrV4vu3FRxkkGLE+Wb7G3xoKFp+',
          region: 'us-east-1', // e.g., 'us-east-1'
          sessionToken: 'FwoGZXIvYXdzEAkaDD3DBkfbIpf3DtplqSLJAauOF96fPgMc+pWWpDwiAzwj1M6CJ/xY8DIaxI7y0PRiE/MAk0shsstI0BwVxCVglDP6piSPX3V9Ri/xSquQvJJhLeZ18UAqecuOGaJAVlDthEC3okWzVrhQwl11ID8XBGBk47JtiWGEs5ZQcLIkIvliLzEJnIlQ9tuIzrQKqwVEygjs3W/xb7HphlQ8bS1iUdUDj/F4o29AeD1p0Si7wmc/oTkwmfwh1aXJruhvO3wRptLHyrRupf/PYoSKsEXEeQ0ICH2r+qdW2yir5LerBjItZMFQWsScgOp4Yh47COXG+8LOGmUsNfhk3nvvH0FSsZ4UYVJjHPm2txp/Wkgq'
        });
   
        // Create an S3 instance
        const s3 = new AWS.S3();
   
        // Set the bucket name
        const bucketName = 'resumecandidates';
   
        // Set the file key (name) in S3
        const fileKey = `uploads/${selectedFile.name}`;
   
        // Set the params for S3 upload
        const params = {
          Bucket: bucketName,
          Key: fileKey,
          Body: selectedFile,
          ContentType: selectedFile.type,
        };
   
        // Upload the file to S3
        s3.upload(params, (err, data) => {
          if (err) {
            console.error('Error uploading file:', err);
          } else {
            console.log('File uploaded successfully:', data);
          }
        });
      } else {
        console.error('No file selected.');
      }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        JOIN WE-CODERS COMMUNITY!
      </Typography>
      <Typography variant="body1" className={styles.description}>
        Share your resume here
      </Typography>
      {/* <label htmlFor="fileInput" className={styles.uploadButton}>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className={styles.fileInput}
          accept=".pdf, .doc, .docx"
        />
        <Button variant="contained" color="primary" onClick={handleUpload} className={styles.uploadButton}>
          <span className={styles.uploadIcon}>📤</span> Upload
        </Button>
      </label> */}
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    </Box>
  );
};

export default Member;
