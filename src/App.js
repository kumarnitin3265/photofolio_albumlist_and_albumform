
import './App.css';
import Navbar from "./Components/Navbar";
import AlbumForm from './Pages/AlbumForm';
import AlbumsList from "./Pages/AlbumsList";
import ImagesList from './Pages/ImagesList';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageForm from './Pages/ImageForm';
import EditForm from './Pages/EditForm';

function App() {

  // states used in AlbumsList
  const [createdAlbums, setCreatedAlbums] = useState([]);  // New state to track all created albums
  const [isAdd, setIsAdd] = useState(false);

  // state used in both albumList and ImageList
  const [imageList, setImageList] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [album, setAlbum] = useState("");
  const [editIndex, setEditIndex] = useState("");

  // state used in imageForm
  const [addedImages, setAddedImages] = useState([]);
  const [isAddImage, setIsAddImage] = useState(false);

  // state used in editForm
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [editURL, setEditURL] = useState("");
  const [editTitle, setEditTitle] = useState("");

  return (
    <>
      <ToastContainer />
      <Navbar />

      {isEdit && <EditForm selectedImage={selectedImage} 
      editURL={editURL} setEditURL={setEditURL} editTitle={editTitle} setEditTitle={setEditTitle} 
      addedImages={addedImages} editIndex={editIndex} setEditIndex={setEditIndex} selectedAlbum={selectedAlbum} setIsEdit={setIsEdit}/>}

      {isAdd && <AlbumForm setCreatedAlbums={setCreatedAlbums} createdAlbums={createdAlbums} album={album} setAlbum={setAlbum} />}

      {isAddImage && <ImageForm setAddedImages={setAddedImages} selectedAlbum={selectedAlbum}/>}
      
      {imageList ? <ImagesList imageList={imageList} setImageList={setImageList} isAddImage={isAddImage} setIsAddImage={setIsAddImage}
        addedImages={addedImages} setAddedImages={setAddedImages} selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum} isEdit={isEdit} setIsEdit={setIsEdit} setEditURL={setEditURL} 
        setEditTitle={setEditTitle} setEditIndex={setEditIndex} setSelectedImage={setSelectedImage} /> :
        <AlbumsList setCreatedAlbums={setCreatedAlbums} createdAlbums={createdAlbums} isAdd={isAdd} setIsAdd={setIsAdd}
          imageList={imageList} setImageList={setImageList} selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum}
        />}

    </>
  );
}

export default App;
