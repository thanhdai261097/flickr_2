
import React from 'react'
import Explore from './Explore'
import searchTag from './Tag'
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import Photo from './Photo'

class App extends React.Component {
    render() {
      return (
        <BrowserRouter>
            <div>
            <Switch>
            <Route exact path="/" component={Explore} />
            <Route path="/explore" component={Explore} />
            <Route path="/searchTag" component={searchTag} />
            <Route path="/photo" component={Photo} />
            </Switch>
            </div>
        </BrowserRouter>
      );
    }
  }

  export default App;
