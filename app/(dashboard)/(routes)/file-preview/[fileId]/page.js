"use client"
import React, { useEffect, useState } from 'react'
import {app} from '@/firebaseConfig';
import { doc, getFirestore } from 'firebase/firestore';

const page = ({params}) => {
  const db = getFirestore(app);
  const [file,setFile] = useState();
  useEffect(()=>{
    console.log(params?.fileId)
    getFileInfo();
  },[])
  const getFileInfo=async()=>{
     const docRef = doc(db , "uploadedFile",params?.fileId)
     const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      console.log("Document data:", docSnap.data());
      setFile(docSnap.data())
    }else{
      console.log("No such Document!");
    }
  }
  return (
    <div>
      file-Preview2
    </div>
  )
}

export default page
