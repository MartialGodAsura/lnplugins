import React, { useEffect, useState } from 'react';
import AccordionContainer from '../components/AccordionContainer';
import {
  Alert,
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import useDebounce from '@hooks/useDebounce';

export default function HeadersSection() {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies] = useState('');
  const debounceCookies = useDebounce(cookies, 500);
  const [fetchMode, setFetchMode] = useState('proxy');
  const [alertVisible, setAlertVisble] = useState(false);
  const [useUserAgent, setUseUserAgent] = useState(true);
  useEffect(() => {
    if (alertVisible) {
      const id = setTimeout(() => setAlertVisble(false), 1000);
      return () => clearTimeout(id);
    }
  }, [alertVisible]);

  useEffect(() => {
    setLoading(true);
    fetch('settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cookies: debounceCookies,
        fetchMode: fetchMode,
        useUserAgent,
      }),
    })
      .then(() => setAlertVisble(true))
      .finally(() => setLoading(false));
  }, [debounceCookies, fetchMode, useUserAgent]);

  return (
    <AccordionContainer title="Settings" loading={loading}>
      {alertVisible ? (
        <Alert
          sx={{
            position: 'absolute',
            zIndex: 2,
            top: 0,
            right: 0,
          }}
        >
          Settings updated
        </Alert>
      ) : null}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">User Agent</InputAdornment>
            ),
          }}
          disabled
          value={navigator.userAgent}
          sx={{ width: '100%' }}
        />
        <Checkbox
          size="large"
          checked={useUserAgent}
          onChange={e => setUseUserAgent(e.target.checked)}
        />
      </Box>
      <Box sx={{ height: 10 }} />
      <TextField
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">Cookies</InputAdornment>
          ),
        }}
        value={cookies}
        onChange={e => {
          setCookies(e.target.value.trim());
        }}
        sx={{ width: '100%' }}
      />
      <Box sx={{ height: 10 }} />
      <div
        style={{
          alignContent: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        Fetch Mode:
        <Select
          variant="outlined"
          label="Fetcher"
          value={fetchMode}
          onChange={e => setFetchMode(e.target.value)}
        >
          <MenuItem value="proxy">Proxy</MenuItem>
          <MenuItem value="node-fetch">Node fetch</MenuItem>
          <MenuItem value="curl">Curl</MenuItem>
        </Select>
      </div>
    </AccordionContainer>
  );
}
