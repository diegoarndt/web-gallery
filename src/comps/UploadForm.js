import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg', 'image/gif'];

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image in either PNG, JPEG, or GIF format.');
    }
  };

  return (
    // When user clicks on the + button, open file explorer to select image
    <form>
      <label>
        <input
          type='file'
          style={{ display: 'none' }}
          onChange={changeHandler}
          accept='image/*'
        />
        <span className='add-image' title='Add a new picture'>+</span>
      </label>
      <div className='output'>
        {error && <div className='error'>{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
