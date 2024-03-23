import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size <2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/*')
    //       }
    //   }
    // }
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload image more than 2MB .");
        setImageUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null)
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="w-full  mx-auto p-3 ">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress &&  imageFileUploadProgress<100 &&(
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={` ${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={
                {
                  root:{
                    width:'100%',
                    height:'100%',
                    position:'absolute',
                    top:0,
                    left:0,
                  },
                  path:{
                    stroke: `rgba(62,152,199, ${imageFileUploadProgress /100})`,
                  }
                }
              }

            />
          )}
          <img
            src={imageFileUrl || currentUser.profilepicture}
            alt="User"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-15'}`}
          />
        </div>

        <div className="lg:w-1/2 flex flex-col lg:mx-auto gap-6 px-0 sm:px-10">
          {imageFileUploadError && (
            <Alert color="failure">{imageFileUploadError}</Alert>
          )}
          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="Abc@gmail.com"
            defaultValue={currentUser.email}
          />
          <TextInput type="password" id="password" placeholder="password" />
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            Update
          </Button>
          <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer">Delete Account</span>
            <span className="cursor-pointer">Sign Out</span>
          </div>
        </div>
      </form>
    </div>
  );
}
