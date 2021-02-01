import React, {useState} from 'react';

const App = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('image', image, image.name);


        fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: form_data
        })
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
                <input type="file" id="image" name="image" accept="image/png, image/jpeg"
                       onChange={handleImageChange} required/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default App;

