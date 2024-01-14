
import albumStyle from "../Styles/AlbumsList.module.css";

function AlbumList({addAlbum}) {

    const handleAddAlbum = (e) => {
        addAlbum = true;
    }
    
    return (
        <div className={albumStyle.home}>
            <div className={albumStyle.album}>
                <span>
                    Your albums
                </span>
                <button className={albumStyle.addAlbum} onChange={(e) => handleAddAlbum(e.target.value)}>
                    Add album
                </button>
            </div>
            
        </div>
    )
}

export default AlbumList;