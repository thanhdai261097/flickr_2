import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Navbar from './Navbar';
import {api_key} from './apikey';
import {Container} from 'reactstrap';
import Gallery from 'react-grid-gallery';


const url = (page) => ("https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=" +api_key+ "&extras=url_l%2C+owner_name%2C+views&per_page=20&page="+page+"&format=json&nojsoncallback=1")
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

class Explore extends Component {
  constructor(props){
    super(props);
    this.state = {
      listPhotos: [],
      curPage: 1
    }
    this.handleClickImage.bind(this);
  }



  loadData(page) {
    axios.get(url(page))
    .then(res => {
      this.setState({
        listPhotos: [...this.state.listPhotos,...res.data.photos.photo],
        curPage: page
      })
    })
    .catch(err => {
      this.setState({
        isLoading: false
      })
    })
  }

  loadFunc() {
    this.loadData(parseInt(this.state.curPage, 10) + 1);
  }

  handleClickImage =  (index) => { 
    
    var images = this.state.listPhotos;
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
          loadMore={this.loadFunc.bind(this)}
          hasMore={this.state.curPage < 10 ? true: false}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <div style={{
                      display: "block",
                      minHeight: "1px",
                      width: "100%",
                      border: "1px solid #ddd",
                      overflow: "auto"}}>
            <Gallery enableImageSelection={false} rowHeight={280}   onClickThumbnail = {this.handleClickImage} images={this.state.listPhotos.map((photo) => {
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

export default Explore;
