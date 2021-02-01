import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {

    state = {
        image: null
    };

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
        let url = 'http://localhost:3001/upload';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    };

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit} encType="multipart/form-data" method="POST">
                    <p>
                        <input type="file" id="image" name="image" accept="image/png, image/jpeg"
                               onChange={this.handleImageChange} required/>
                    </p>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default App;
