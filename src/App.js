import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropzone from 'react-dropzone';
import { post } from 'axios';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Pneumonia</h1>
                    <p>(sounds like a magic place, doesn't it?)</p>
                </header>
                <p className="App-intro">
                    This application is written with one purpose - getting familiar with Convolution neural networks. In
                    reality, chest
                    x-rays can detect only exitance of some abnormalities.
                    However, as the dataset of patients with pneumonia was used for training the model, this app has
                    such a magic name.
                </p>
                <p>
                    The precision of the model is 84% on test data.
                </p>
                <p>The credit for x-rays's dataset goes to <a
                    href="https://www.kaggle.com/paultimothymooney/chest-xray-pneumonia">https://www.kaggle.com/paultimothymooney/chest-xray-pneumonia</a>
                </p>

                <Dropzone onDrop={(files) => this.onDrop(files)} className="Dropzone-layer">
                    <div>Drop an X Ray of your chest here.</div>
                </Dropzone>

                <div class="Example-div">
                    <div>
                        <h5>Healthy</h5>
                        <img src="/images/healthy-example.jpeg" alt=""/>
                    </div>
                    <div>
                        <h5>Penuomonia</h5>
                        <img src="/images/pneumonia-example.jpeg" alt=""/>
                    </div>
                </div>
            </div>
        );
    }

    onDrop(acceptedFiles) {
        const formData = new FormData();
        formData.append('image', acceptedFiles[ 0 ]);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        return post('http://54.255.147.3:5000/classify', formData, config)
            .then(response => {
                if ( response.data[ 'result' ] === 'PNEUMONIA' ) {
                    alert('Pneumonia');
                } else if ( response.data[ 'result' ] === 'NORMAL' ) {
                    alert('Healthy');
                }
            })
            .catch((error) => console.log(error));
    }
}

export default App;
