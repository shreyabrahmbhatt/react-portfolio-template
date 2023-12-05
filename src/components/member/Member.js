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
          accessKeyId: 'ASIAWIGGIHCIV3MLHO4E',
          secretAccessKey: 'aKKC9SVCTfWmmg3QM1LFUQ9U3XOmmBNbv9SaNURq',
          region: 'us-east-1', // e.g., 'us-east-1'
          sessionToken: 'FwoGZXIvYXdzEBMaDAsXGpvBv3kR6nk3IyLJAbvoapeyb/14ViEWxyCIVEG6djP+bCW0REkOLz3nfvZxROv1lBe3gSusa7dK7PjAI8xl0I+P145b059PA43I+I4QPr0WYLC70RojC0kHRY+T9hF5L014YSfOdJ7BCWzvt5qGdXYmJvsC3/iFLzJ19z5SVXOenICcazoxh23eJDnSJxvfskgIaebqRk4FScYpd8lUF/ZsgezjCKFVtJM2Wq3wk0QeR0KvnIHmXla+qZ4z1cKWX3dr0OAG+knFKC4pVBAy0WaveEDJlCjV9rmrBjItEq6Kr1S7K+x3LtD5o2R0zacrEnFgLtO2oplHKEcORuAg3V9atezSH2digIzo'
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
