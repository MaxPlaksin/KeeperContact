import React, { useRef, useState } from 'react';
import { Button, Avatar, Stack } from '@mui/material';

const ContactPhotoUpload = ({ photoUrl, onUpload }) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState(photoUrl || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar src={preview} alt="Фото" sx={{ width: 56, height: 56 }} />
      <Button variant="outlined" component="label">
        Загрузить фото
        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputRef}
          onChange={handleFileChange}
        />
      </Button>
    </Stack>
  );
};

export default ContactPhotoUpload; 