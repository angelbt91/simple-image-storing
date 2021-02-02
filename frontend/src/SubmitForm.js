import React, {useState} from 'react';

const SubmitForm = () => {

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData(); // https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/FormData
        form_data.append('image', image, image.name);

        fetch('http://localhost:3001/image', {
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
            {/* 'encType' attribute is important to set when using Multer on the backend */}
            <input type="file" id="image" name="image" accept="image/png, image/jpeg"
                   onChange={handleImageChange} required/>
            <input type="submit" value="Upload picture"/>
        </form>
    )

}

export default SubmitForm;