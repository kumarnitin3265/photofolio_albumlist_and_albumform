
import albumStyle from "../Styles/AlbumsList.module.css";
import { db } from "../firebaseInit";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

function AlbumList({ isAdd, setIsAdd, createdAlbums, setCreatedAlbums, imageList, setImageList, setSelectedAlbum }) {

    useEffect(() => {
        const fetchAllAlbums = async () => {
            try {
                const albumCollectionRef = collection(db, "albums");
                const snapShot = await getDocs(albumCollectionRef);
                const albumsArray = snapShot.docs.map((doc) =>
                    doc.data().albumName
                );

                setCreatedAlbums(albumsArray);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllAlbums();
    }, [setCreatedAlbums]);     


    const handleAddAlbum = (e) => {
        e.preventDefault();

        setIsAdd(!isAdd);

    }

    const handleAlbum = (e, createdAlbum) => {
        e.preventDefault();

        setSelectedAlbum(createdAlbum);
        console.log()
        if (isAdd) {
            setIsAdd(false);
        }

        setImageList(!imageList);
    }


    return (
        <>
            <div className={albumStyle.content}>
                <div className={albumStyle.albumlist}>
                    <h3>Your albums</h3>
                    <button type="submit" onClick={handleAddAlbum} className={isAdd ? albumStyle.cancel : albumStyle.add}>
                        {isAdd ? "Cancel" : "Add album"}
                    </button>
                </div>
                {createdAlbums.length > 0 && (
                    <div className={albumStyle.albumListAlbums}>
                        {createdAlbums.map((createdAlbum, i) => (
                            <div className={albumStyle.createdAlbums} key={i} onClick={(e) => handleAlbum(e, createdAlbum)}>
                                <div className={albumStyle.icons}>
                                    <div className={albumStyle.update}>
                                        <img src="https://cdn-icons-png.flaticon.com/128/1160/1160758.png" alt="update" />
                                    </div>
                                    <div className={albumStyle.delete}>
                                        <img src="https://cdn-icons-png.flaticon.com/128/6711/6711573.png" alt="delete" />
                                    </div>

                                </div>
                                <img src="https://cdn-icons-png.flaticon.com/128/833/833453.png" alt="gallery"/>
                                <span>
                                    {createdAlbum}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default AlbumList;