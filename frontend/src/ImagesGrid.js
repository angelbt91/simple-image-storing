import React, {useState, useEffect} from 'react';

const ImagesGrid = () => {
    const [images, setImages] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/images')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then(result => {
                setImages(result);
            })
            .catch(error => {
                console.log("Error when retrieving images:", error);
            })
    }, []);

    return (
        <>
            {images && images.map(image => {
                // When using base64 to print images, src must be in this format
                const src = `data:${image.mimeType};base64,${image.image}`;
                return (
                    <div style={{'padding': '10px'}}>
                        <img src={src} alt={image.name} style={{'maxWidth': '100%'}}/>
                        <p> {image.name} - {image.mimeType} - {image.size} kb</p>
                    </div>
                )
            })}
        </>
    )
}

export default ImagesGrid;