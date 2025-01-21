import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Chip,
  Typography,
  Grid,
  TextareaAutosize,
} from "@mui/material";

const SendEmails = () => {
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAddEmail = () => {
    if (isValidEmail(emailInput)) {
      setEmails((prev) => [...prev, emailInput]);
      setEmailInput("");
      setError("");
    } else {
      setError("Please enter a valid email address.");
    }
  };

  const handleDeleteEmail = (emailToDelete) => {
    setEmails(emails.filter((email) => email !== emailToDelete));
  };

  const handleSend = async () => {
    if (emails.length === 0) {
      alert("Please add at least one email address.");
      return;
    }
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      const response = await fetch("/api/admin/bulk-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails, message }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Emails sent successfully!");
        setEmails([]);
        setMessage("");
      } else {
        alert(`Failed to send emails: ${result.message}`);
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("An error occurred while sending emails. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Send
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            label="Email Address"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            fullWidth
            error={!!error}
            helperText={error}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEmail}
            fullWidth
          >
            Add Email
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        {emails.map((email, index) => (
          <Chip
            key={index}
            label={email}
            onDelete={() => handleDeleteEmail(email)}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" gutterBottom>
          Message
        </Typography>
        <TextareaAutosize
          minRows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          placeholder="Enter your message here"
        />
      </Box>

      <Button
        variant="contained"
        color="success"
        onClick={handleSend}
        fullWidth
        sx={{ mt: 3 }}
      >
        Send Emails
      </Button>
    </Box>
  );
};

export default SendEmails;
