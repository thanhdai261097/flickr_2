import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Navbar from './Navbar';
import {api_key} from './apikey';
import {Container} from 'reactstrap';
import Gallery from 'react-grid-gallery';
import queryString from 'query-string';

const url = (page,tag) => ("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+api_key+"&tags="+tag+"&extras=url_l%2C+owner_name%2C+views&per_page=20&page="+page +"&format=json&nojsoncallback=1")
console.log(url);
const captionStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  maxHeight: "240px",
  overflow: "hidden",
  position: "absolute",
  bottom: "0",
  width: "100%",
  color: "white",
  padding: "10px",
  fontSize: "90%"
};

class SearchTag extends Component {
  constructor(props){
    super(props);
    this.state = {
      Photos: [],
      curPage: 1,
      tag : '',
    }
    this.handleClickImage.bind(this)
  }


  loadPhotos(page,tag) {
    axios.get(url(page,tag)).then(res => {
      this.setState({
        Photos: [...this.state.Photos,...res.data.photos.photo],
        curPage: page,
        tag : tag
      })
    })
  }

  loadList() {
    const parsed = queryString.parse(this.props.location.search);

    this.loadPhotos(parseInt(this.state.curPage,10) + 1,parsed.tag);
  }

  handleClickImage =  (index) => { 
    
    var images = this.state.Photos;
    var img = images[index];
    console.log(img.id );
    const path = "./photo/?id=" + img.id;
    this.props.history.push(path);
}
  render() {
    return (
      <Container>
        <Navbar></Navbar>
        <InfiniteScroll
          pageStart={1}
          loadMore={this.loadList.bind(this)}
          hasMore={this.state.curPage < 10 ? true: false}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <div style={{
                      display: "block",
                      minHeight: "1px",
                      width: "100%",
                      border: "1px solid #ddd",
                      overflow: "auto"}}>
            <Gallery enableImageSelection={false} rowHeight={280}   onClickThumbnail = {this.handleClickImage} images={this.state.Photos.map((photo) => {
              return {
                src: photo.url_l,
                thumbnail: photo.url_l,
                thumbnailWidth: photo.width_l,
                thumbnailHeight: photo.height_l,
              customOverlay: (
                  <div style={captionStyle}>
                    <b>{photo.title}</b>
                    <div>Owner: {photo.ownername}</div>
                    <div>Views: {photo.views}</div>
                  </div>)}
            })}/>
          </div>
        </InfiniteScroll>
      </Container>
    );
  }
}

export default SearchTag;
