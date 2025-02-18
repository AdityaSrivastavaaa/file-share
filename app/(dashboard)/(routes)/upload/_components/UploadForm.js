import React, { useState, useEffect } from 'react';
import AlertMsg from './AlertMsg';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';

const UploadForm = ({ uploadBtnClick, progress }) => {
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (progress === 100) {
      setFile(null);
    }
  }, [progress]);

  const onFileSelect = (files) => {
    const selectedFile = files[0];
    if (selectedFile && selectedFile.size > 2000000) {
      setErrorMsg('Maximum file upload size is 2MB');
      return;
    }
    setErrorMsg(null);
    setFile(selectedFile);
  };

  return (
    <div className='text-center'>
      <div className='flex items-center justify-center w-[60%] mx-auto'>
        <label htmlFor='dropzone-file' className='flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100'>
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <svg className='w-8 h-8 mb-4 text-blue-500' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 16'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'/>
            </svg>
            <p className='mb-2 text-lg md:text-2xl text-gray-500'>
              <span className='font-semibold'>Click to upload</span> or <strong className='text-primary'>drag</strong> and <strong className='text-primary'>drop</strong>
            </p>
            <p className='text-xs text-gray-500'>SVG, PNG, JPG or GIF (MAX Size: 2MB)</p>
          </div>
          <input id='dropzone-file' type='file' className='hidden' onChange={(event) => onFileSelect(event.target.files)} />
        </label>
      </div>
      {errorMsg ? <AlertMsg msg={errorMsg} /> : null}
      {file ? <FilePreview file={file} removeFile={() => setFile(null)} /> : null}
      {progress > 0 ? <ProgressBar progress={progress} /> : (
        <button
          disabled={!file}
          className='p-2 bg-primary text-white w-[30%] rounded-full mt-5 disabled:bg-gray-400'
          onClick={() => uploadBtnClick(file)}
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadForm;
