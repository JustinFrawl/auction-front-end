import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import AuctionList from './AuctionList.js';
// import BidWindow from './BidWindow.js';
import AuctionSearchBar from './AuctionSearchBar.js';
import AuctionDetail from './AuctionDetail.js';
import NewAuctionForm from './NewAuctionForm.js';
import NewBidForm from './NewBidForm.js'
import Login from './login.js'
import Auth from './Auth.js';
import Navbar from './Navbar.js'
import { withRouter } from 'react-router-dom'
import { Grid, Segment } from 'semantic-ui-react'
import NewUserForm from './NewUserForm.js'
import Logout from './Logout.js'


class App extends Component {
// const API_LINK = 'https://auction-back-end.herokuapp.com/api/v1/auctions'

constructor(){
  super()

  this.state = {
    auctions: [],
    searchTerm: '',
    selectedAuction: null,
    newAuction: {},
    newUser: {},
    isLoggedIn: false,
    users: [],
    auth: {
      user: {}
      }
  }
  // this.updateAuctions = this.updateAuctions.bind(this)
}

componentDidMount(){
  this.fetchAuctions()
  this.getUsers()
  const token = localStorage.getItem('token');
    if (token) {

      // make a request to the backend and find our user
      Auth.currentUser()
      .then(user => {
        // debugger
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ isLoggedIn: true, auth: updatedState });

      });
    }
  }

  getUsers = () => {
    fetch('https://auction-back-end.herokuapp.com/api/v1/users')
      .then(res => res.json())
      .then(res => {
        const users = res;
        this.setState({
          users: res

        });
        console.log(users);
      });
      console.log(this.state);
  }

login = data => {
    this.setState({
      isLoggedIn: true,
      auth:{user: data}
    });
    localStorage.setItem('token', data.jwt);
  };

  logout = () => {
      localStorage.removeItem('token');
      this.setState({ isLoggedIn: false, auth: { user: {} } });
    };

fetchAuctions = () => {
    fetch('https://auction-back-end.herokuapp.com/api/v1/auctions')
    .then(res => res.json())
    .then(res => {
      const auctions = res;
      this.setState({
        auctions: res

      });
      console.log(auctions);
    });
    console.log(this.state);
}

fetchUser = (userData) => {
  console.log("fetch user", userData)
  fetch('https://auction-back-end.herokuapp.com/api/v1/login', {
    method: 'POST',
    headers: {
       Accepts: 'application/json, text/plain',
       'Content-Type': 'application/json'
      },
    body: JSON.stringify(userData)
  })
  .then(res => res.json())
  .then(res => console.log("login complete", res))

}

updateAuctions= () => {
    fetch('https://auction-back-end.herokuapp.com/api/v1/auctions')
    .then(res => res.json())
    .then(res => {
      const stateSelected = this.state.selectedAuction;
      const updatedSelected = res.filter(selected => selected.id === stateSelected.id)
      console.log(updatedSelected[0])
      this.setState({
        selectedAuction: updatedSelected[0]
      });
    });
}

filterResults = () => {
  // console.log(this.state)
   let newList = this.state.auctions.filter(auction => {
     if(auction.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
       return auction
     }
   })
    return newList
 }
 createAuction = data => {
  fetch(`https://auction-back-end.herokuapp.com/api/v1/auctions`, {
    method: 'POST',
    headers: {
       Accepts: 'application/json, text/plain',

                'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  })
  this.fetchAuctions()
  // .catch(res => res.json());
}

createUser = data => {
 fetch(`https://auction-back-end.herokuapp.com/api/v1/users`, {
   method: 'POST',
   headers: {
      Accepts: 'application/json, text/plain',

               'Content-Type': 'application/json'
     },
   body: JSON.stringify(data)
 })
 // .catch(res => res.json());
}

postBid = (data, auctionId, userId) => {
  console.log(auctionId)
  console.log(userId)
  fetch(`https://auction-back-end.herokuapp.com/api/v1/bids`, {
    method: 'POST',
    headers: {
      Accepts: 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
      amount: data,
      user_id: userId,
      auction_id: auctionId
  }
    )
  }).then(()=> this.updateAuctions())
}



handleCreateAuction = auctionInfo => {
 console.log(auctionInfo);
 this.createAuction(auctionInfo)
 // .then(res => {
 //   console.log('res', res);
 // });
};

handleCreateUser = userInfo => {
 console.log(userInfo);
 this.createUser(userInfo)
 // .then(res => {
 //   console.log('res', res);
 // });
};

handleCreateBid = (bidInfo, auctionId, userId) => {
  this.postBid(bidInfo, auctionId, userId);

}
bidRefresh = () => {
  const myVar = setInterval(this.updateAuctions(), 1000);
}


  render() {
    console.log("APP", this.props)
    if(this.state.auctions.length < 1){
      return <div> LOADING </div>
    }
    return (
      <div>

      <Route path="/" component={Header} />

    {/* this means header is everywhere */}

      <Route
        exact path="/login"
        render={(props) => {
          return (<Login {...props} handleLogin={this.login} fetchUser={this.fetchUser} />)
          }
        }
      />
      <Route
        exact path="/users/new"
        render={(props) => {
          return (<NewUserForm {...props} handleCreateUser={this.handleCreateUser} />)
          }
        }
      />

      <Route path="/home" render={ () => {
          return (
            <div>
              <Grid columns={2} divided>
                <Grid.Row stretched>
                  <Grid.Column width={3}>
                    <Segment>
              <AuctionSearchBar
              searchTerm={this.state.searchTerm}
              handleSearchTerm={searchTerm => this.setState({searchTerm})}
              />
            </Segment>
              <Segment>
              <AuctionList
                auctions={this.filterResults()}
                onAuctionSelect={selectedAuction => this.setState({selectedAuction})}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column width={13}>
              <AuctionDetail
                auction={this.state.selectedAuction}
                handleCreateBid={this.handleCreateBid}
                grabAuctionId={this.grabAuctionId}
                currentUser={this.state.auth}
                userList={this.state.users}
                refreshBid={this.bidRefresh}
                />
            </Grid.Column>
          </Grid.Row>
        </Grid>
          </div>
        )
        }
      }
    />

<Route
  path ="/auction/new"
  render={(props) => {
    return(<NewAuctionForm {...props}
      handleCreateAuction={this.handleCreateAuction}
      currentUser={this.state.auth}
     />
    )
  }}

/>
<Route
  path="/log_out"
  render={(props) => {
    return (<Logout {...props} logUserOut={this.logout} />)
    }
}
/>
      </div>
    );
  }
}

export default withRouter(App);
