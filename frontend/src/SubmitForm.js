import React, {useState} from 'react';

const SubmitForm = () => {

    const [images, setImages] = useState(null);

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData(); // https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/FormData
        // Use Array.from() to convert the images var into an Array,
        // as files coming from the input type=file element are a FileList object
        Array.from(images).forEach(image => {
            form_data.append('images', image, image.name);
        })

        fetch('http://localhost:3001/images', {
            method: 'POST',
            body: form_data
        })
            .then(res => {
                if (res.ok) {
                    // reloads the page after a successful upload - not fancy, but gets the job done
                    document.location.reload();
                } else {
                    throw Error(res.statusText);
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
            {/* 'encType' attribute must be set when using Multer on the backend */}
            <input type="file" id="images" name="images" accept="image/png, image/jpeg"
                   onChange={handleImageChange} required multiple/>
            <input type="submit" value="Upload picture"/>
        </form>
    )

}

export default SubmitForm;