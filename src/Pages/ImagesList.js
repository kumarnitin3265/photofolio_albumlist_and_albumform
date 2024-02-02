
import { useEffect, useState } from "react";
import imageStyle from "../Styles/ImagesList.module.css";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebaseInit";
import Notification from "./Notification";

function ImagesList({ imageList, setImageList, isAddImage, setIsAddImage, addedImages,
    setAddedImages, selectedAlbum, setSelectedAlbum, isEdit, setIsEdit, setEditURL,
    setEditTitle, setEditIndex, setSelectedImage }) {

    const [carousel, setCarousel] = useState(false);
    const [searchBar, setSearchBar] = useState(false);
    const [searchItem, setSearchItem] = useState("");
    const [url, setUrl] = useState({ url: "", index: -1 });

    // try to fetch images from firebase
    useEffect(() => {
        const fetchAllImages = async () => {
            try {
                const unsub = onSnapshot(doc(db, "albums", selectedAlbum), (doc) => {
                    setAddedImages(doc.data().images);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllImages();
    }, [selectedAlbum, setAddedImages]);

    const handleBack = (e) => {

        if (isAddImage) {
            setIsAddImage(false);
        }

        setImageList(!imageList);
        setSelectedAlbum("");

    }

    const handleSearch = (query) => {
        setSearchItem(query);

        let filtered = addedImages;

        filtered = filtered.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        setAddedImages(filtered);
    }


    const handleAddImage = (e) => {
        if (isEdit) {
            setIsEdit(false);
            // setIsAddImage(false);
        } else {
            setIsAddImage(!isAddImage);
        }

    }

    const handleCarousel = (url, index) => {
        setUrl({ url, index });
        setCarousel(!carousel);
    }

    const handleBackHome = () => {
        setCarousel(!carousel);
    }

    const scrollBack = (i) => {
        let imagesArray = addedImages;
        let neg = i - 1;

        setUrl({
            url: imagesArray[neg < 0 ? addedImages.length - 1 : neg].imageURL,
            index: neg < 0 ? addedImages.length - 1 : neg
        });
    }

    const scrollForward = (i) => {
        let imageArray = addedImages;

        setUrl({ url: imageArray[(i + 1) % (addedImages.length)].imageURL, index: (i + 1) % (addedImages.length) });
    }

    const handleEdit = (e, i) => {

        // Stop the event from propagating to the parent div
        e.stopPropagation();
        // setIsAddImage(false);

        setEditIndex(i);


        if (!isEdit) {
            setIsEdit(true);
            setIsAddImage(false);
        }

        let updatedImages = addedImages;

        setEditURL(updatedImages[i].imageURL);
        setEditTitle(updatedImages[i].title);
        setSelectedImage(updatedImages[i].title);
    }

    const handleDelete = async (e, i) => {

        // Stop the event from propagating to the parent div
        e.stopPropagation();

        setEditIndex(i);

        let updatedImages = addedImages.filter((image, index) => i !== index);

        setAddedImages(updatedImages);

        try {

            // Update the Firestore document with the filtered array
            const albumDocRef = doc(db, "albums", selectedAlbum);
            await updateDoc(albumDocRef, {
                images: updatedImages
            });

            Notification("Image deleted successfully!", false);
        } catch (error) {
            console.error("Error deleting image from the database:", error);

            // Handle error and display a notification
            Notification("Error in deleting image from the database", true)
        }

    }

    const handleSearchBar = () => {
        setSearchBar(!searchBar);
    }

    return (
        <div className={imageStyle.head}>
            <div className={imageStyle.image}>
                <span className={imageStyle.back} onClick={handleBack}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png" alt="back" />
                </span>
                <div className={addedImages.length > 0 ? undefined : imageStyle.notFound}>
                    <h3>
                        {addedImages.length > 0 ? "Images in " + selectedAlbum : "No images found in the " + selectedAlbum}
                    </h3>
                </div>
                <div className={imageStyle.search}>
                    {searchBar && <input type="text" placeholder="Search..." value={searchItem} onChange={(e) => handleSearch(e.target.value)} />}
                    {!searchBar && addedImages.length > 0 ? <img src="https://cdn-icons-png.flaticon.com/128/954/954591.png" alt="search" onClick={handleSearchBar} /> : undefined}
                    {searchBar && <img src="https://cdn-icons-png.flaticon.com/128/1617/1617543.png" alt="cancel" onClick={handleSearchBar} />}
                </div>
                <button type="submit" onClick={handleAddImage} className={isAddImage || isEdit ? imageStyle.cancel : imageStyle.addImage} >
                    {isAddImage || isEdit ? "Cancel" : "Add Image"}
                </button>
            </div>
            {addedImages.length > 0 && (
                <div className={imageStyle.imageList}>
                    {addedImages.map((albumImages, i) => (
                        <div className={imageStyle.images} key={i} onClick={(e) => handleCarousel(albumImages.imageURL, i)}>
                            <div className={imageStyle.update} onClick={(e) => handleEdit(e, i)}>
                                <img src="https://cdn-icons-png.flaticon.com/128/1160/1160758.png" alt="update" />
                            </div>
                            <div className={imageStyle.delete} onClick={(e) => handleDelete(e, i)}>
                                <img src="https://cdn-icons-png.flaticon.com/128/6711/6711573.png" alt="delete" />
                            </div>
                            <img src={albumImages.imageURL} alt={albumImages.title} />
                            <span>{albumImages.title}</span>
                        </div>
                    ))}
                    {carousel && <div className={imageStyle.carousel}>
                        <div className={imageStyle.cross} onClick={handleBackHome}>
                            <button>x</button>
                        </div>
                        <div className={imageStyle.backScoll} onClick={(e) => scrollBack(url.index)}>
                            <button>{"<"}</button>
                        </div>
                        <div className={imageStyle.url}>
                            <img src={url.url} alt="url" />
                        </div>
                        <div className={imageStyle.forwardScroll} onClick={(e) => scrollForward(url.index)}>
                            <button>{">"}</button>
                        </div>
                    </div>}

                </div>
            )}
        </div>
    )
}

export default ImagesList;