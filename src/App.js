
import './App.css';
import Navbar from "./Components/Navbar";
import AlbumForm from './Pages/AlbumForm';
import AlbumsList from "./Pages/AlbumsList";

function App() {

  let addAlbum = false;

  return (
    <>
      <Navbar />
      <AlbumsList addAlbum={addAlbum}/>
      <AlbumForm />
    </>
  );
}

export default App;
