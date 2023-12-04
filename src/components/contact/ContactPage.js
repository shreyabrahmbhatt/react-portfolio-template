import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Style from './ContactPage.module.scss';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://qzuklaqri7.execute-api.us-east-1.amazonaws.com/prod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log(formData);
        console.log(response);
        console.log('Data submitted successfully');
        // Optionally, you can reset the form after successful submission
        setFormData({
          name: '',
          mobileNumber: '',
          email: '',
          message: '',
        });
      } else {
        console.error('Failed to submit data. Server responded with:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  

  return (
    <Box className={Style.container}>
      <Box className={Style.formBox}>
        <Typography variant="h2">Contact Us</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            name="mobileNumber"
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="message"
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactPage;
