import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export default function PaymentButtons() {
  return (
    <Stack spacing={2} direction="column" alignItems="center">
      {/* Pay with Card */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<CreditCardIcon />}
        sx={{
          background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
          color: 'white',
          width: '80%',
        }}
      >
        Pay with Card
      </Button>

      {/* Pay with Transfer */}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AccountBalanceIcon />}
        sx={{
          background: 'linear-gradient(90deg, #2196F3, #03A9F4)',
          color: 'white',
          width: '80%',
        }}
      >
        Pay with Transfer
      </Button>

      {/* Manual Crypto Payment */}
      <Button
        variant="contained"
        color="info"
        startIcon={<CurrencyBitcoinIcon />}
        sx={{
          background: 'linear-gradient(90deg, #FFC107, #FF9800)',
          color: 'white',
          width: '80%',
        }}
      >
        Manual Crypto Payment
      </Button>
    </Stack>
  );
}
