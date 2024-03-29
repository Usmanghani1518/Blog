import React, { useState } from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [loadingImage, setloadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [errorImage, setErrorImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [errorPublish, seterrorPublish] = useState(null);
  const navigate = useNavigate();
  const uploadImage = async () => {
    if (!image) {
      setErrorImage("There is no image to upload kindly select it First ");
      return;
    }
    setloadingImage(true);
    setErrorImage(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress.toFixed(2));
      },
      (error) => {
        console.log("There is an error in uploading image ");
        setErrorImage("There is an error  in uploading the Image");
        setloadingImage(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          setFormData({ ...formData, postImg: url });
          setloadingImage(false);
          setErrorImage(false);
          setImage(null)
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      seterrorPublish(null);
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        seterrorPublish(data.message);
        return;
      }
      if (res.ok) {
        console.log("i am successfull");
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.log(error);
      seterrorPublish(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a new post
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TextInput
            type="text"
            placeholder="Title of must reui"
            className="flex-1"
            required
            onChange={(e) =>
              setFormData({ ...formData, tittle: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select and Option</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React.Js">React.js</option>
            <option value="Next.Js">Next.js</option>
          </Select>
        </div>
        <div className="flex flex-row gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
          <Button
            type="button"
            onClick={uploadImage}
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            {loadingImage ? (
              <>
                <Spinner value="uploading image" size={"lg"} />{" "}
              </>
            ) : (
              "Upload Image"
            )}{" "}
          </Button>
        </div>
        {errorImage && (
          <Alert color={"failure"} value={errorImage}>
            {errorImage}
          </Alert>
        )}
        {imageUrl && (
          <img
            className="w-full h-72 object-cover"
            src={imageUrl}
            alt="uploaded img"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write your  blog here..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          onClick={handleSubmit}
          disabled={loadingImage}
        >
        {loadingImage ?(<><Spinner size={"md"} value="Uploading Image"/> Uploading Image...</>):"Submit"}  
        </Button>
      </form>
      {errorPublish && (
        <Alert color={"failure"} className=" my-4">
          {errorPublish}
        </Alert>
      )}
    </div>
  );
}
