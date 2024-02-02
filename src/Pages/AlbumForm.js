
import albumFormStyle from "../Styles/AlbumForm.module.css";
import { useEffect, useRef } from "react";
import { db } from "../firebaseInit";
import {  doc, setDoc } from "firebase/firestore";
import Notification from "./Notification";

function AlbumForm({createdAlbums, setCreatedAlbums, album, setAlbum}) {
       
    const addAlbumRef  = useRef(null);

    useEffect(() => {
        addAlbumRef.current.focus();
    }, []);


    const handleCreate = async (e) => {
        e.preventDefault();

         // Create a document reference for the album
        const albumDocRef = doc(db, "albums", album);

        // Update the document with the latest album state
        await setDoc(albumDocRef, {
            albumName: album,
            images: []
        });

        Notification("Album added successfully!", false);
        
        // New state to track the latest created album
        setCreatedAlbums([...createdAlbums, album]);


        // Clear the input field
        setAlbum(""); 
    }

    const handleClear = () => {

        // Clear the input field
        setAlbum("");
    }

    return (
        <>
            <div className={albumFormStyle.albumForm}>
                <div className={albumFormStyle.albForm}>
                    <span>Create an album</span>
                    <form onSubmit={handleCreate}>
                        <input 
                            type="text" 
                            placeholder="Album Name"
                            value={album}
                            ref={addAlbumRef}
                            required
                            className={albumFormStyle.inputStyle}
                            onChange={(e) => setAlbum(e.target.value)}
                        />
                        <button onClick={handleClear} className={albumFormStyle.clear}>Clear</button>
                        <button type="submit" className={albumFormStyle.create}>Create</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AlbumForm;