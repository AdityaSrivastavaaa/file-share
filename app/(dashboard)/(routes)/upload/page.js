"use client";
import React, { useEffect, useState } from 'react';
import UploadForm from './_components/UploadForm';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '@clerk/nextjs';
import { generateRandomString } from '@/app/_utils/GenerateRandomString';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const storage = getStorage(app);
  const db = getFirestore(app);
  const router = useRouter();
  const [fileDocId, setFileDocId] = useState('');

  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type,
    };
    const storageRef = ref(storage, 'file-upload/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed', error);
        toast.error('Upload failed');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          toast.success('File uploaded successfully');
          setProgress(0);
          saveInfo(file, downloadURL);
        });
      }
    );
  };

  const saveInfo = async (file, fileUrl) => {
    const getId = generateRandomString().toString();
    await setDoc(doc(db, "uploadedFile", getId), {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: fileUrl,
      userEmail: user.primaryEmailAddress.emailAddress,
      userName: user.fullName,
      password: '',
      id: getId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + generateRandomString(),
    });
    setFileDocId(getId);
  };

  useEffect(() => {
    if (fileDocId) {
      router.push('/file-preview/' + fileDocId);
    }
  }, [fileDocId, router]);

  return (
    <div className='p-5 px-8 md:px-28'>
      <ToastContainer />
      <h2 className='text-[30px] text-center m-5'>
        Start <strong className='text-primary'>Uploading</strong> File and <strong className='text-primary'>Share</strong> it.
      </h2>
      <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress} />
    </div>
  );
};

export default Page;
