import React from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import queryString from 'query-string';
import {api_key} from './apikey.js'

const url = (ID) =>  ("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key="+api_key+"&photo_id="+ ID +"&format=json&nojsoncallback=1")



class Photo extends React.Component { 
    constructor(props){
        super(props);
    
        this.state = {
          infoPho: [],
        };
        
      }
    
      getPhotoId = () => { 
        const parsed = queryString.parse(this.props.location.search);
        return parsed.id;
      }
      componentDidMount() {
        const photoID = this.getPhotoId();
        
        axios.get(url(photoID)).then(res => { 
          this.setState({
            infoPho: res.data.photo,
          })
        })
      }

      render() {
        const info = this.state.infoPho;
        
        const images = [
            {
              original: "https://farm"+info.farm+".staticflickr.com/"+info.server+"/"+info.id+"_"+info.secret+"_b.jpg",
            },]
        return (
               
                <ImageGallery items = {images}
                            showPlayButton ={false}
                            showIndex={true}
                            showThumbnails={false}      
                />
             
        );
      }
}


export default Photo;