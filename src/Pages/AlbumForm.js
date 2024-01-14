
import albumFormStyle from "../Styles/AlbumForm.module.css";
import { useEffect, useState } from "react";
import { db } from "../firebaseInit";
import {  doc, setDoc} from "firebase/firestore";

function AlbumForm() {

    const [album, setAlbum] = useState([]);
    const [item, setItem] = useState("");
    const [image, setImage] = useState("");
    const [createdAlbum, setCreatedAlbum] = useState("")        // New state to track the latest created album

    // useEffect(() => {
    //     const unSub = onSnapshot(doc(db, "albums", item), (snapShot) => {
    //         if (snapShot.exists()) {
    //             const albumData = snapShot.data();
    //             // const albumArray = albumData. || [];
    //             setCreatedAlbum(albumData);
    //         } else {
    //             console.log("Document does not exist");
    //         }
            
    //         // console.log("snapshotItems", cart);
    //     });
    // })

    const handleCreate = async (e) => {
        e.preventDefault();

        // Use setAlbum to update the state
        setAlbum([item, ...album]);

         // Create a document reference for the album
        const aldumDocRef = doc(db, "albums", item)

        // Update the document with the latest album state
        await setDoc(aldumDocRef, {
            images: [...image]
        });

        // New state to track the latest created album
        setCreatedAlbum(item);

        // Clear the input field
        setItem(""); 
    }

    const handleClear = () => {

        // Clear the input field
        setItem("");

        // Clear the created album on UI
        setCreatedAlbum("");
    }


    console.log(album);
    return (
        <>
            <div>
                <div className={albumFormStyle.albumhead}>
                    <form className={albumFormStyle.albumSearch} onSubmit={handleCreate}>
                        <h2>Create an album</h2>
                        <input 
                            type="text" 
                            placeholder="Album Name"
                            value={item}
                            required
                            className={albumFormStyle.inputStyle}
                            onChange={(e) => setItem(e.target.value)}
                        /><br/>
                        <button type="submit">
                            Create
                        </button>
                    </form>
                    <button onClick={handleClear}>
                        Cancel
                    </button>
                </div>
                {createdAlbum && (
                    <div className={albumFormStyle.albumList}>
                        <div className={albumFormStyle.createdAlbum}>
                            <img src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png"/>
                            <span>
                                {createdAlbum}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AlbumForm;