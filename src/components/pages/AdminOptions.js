import React from 'react';
import Button from '@mui/material/Button';

function AdminOptions({handleLogout}) {
  return (
    <div>
      <Button
      onClick = {handleLogout}
      >
          Logout
        </Button>
    </div>
  )
}

export default AdminOptions;
