import React from 'react';
import Book from './Book/Book'
import axios from 'axios'
import { Route } from 'react-router-dom';

import './App.css'
import FacebookLogin from 'react-facebook-login';
import BookView from './BookView';

const responseFacebook = (response) => {

}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      facebookObj: Object,
      selfToken: String,
      friendToken: String,
      friendData: null
    }

    this.getFriendsData = this.getFriendsData.bind(this);
    this.onChangeFriendTokens = this.onChangeFriendTokens.bind(this);
    this.onChangeUserToken = this.onChangeUserToken.bind(this);
    this.imageClick = this.imageClick.bind(this);
  }

  render() {
    if (this.state.friendData != null) {
      return (
        <div className="App">
          {this.state.friendData.map(item => {
            return (
            <div>
            
            <div className="profile">
            <img src = { 'https://graph.facebook.com/'+item.id+'/picture?type=small' } onClick=""/>
            <span>{item.name}</span>
            </div>
           
            
            {/* {item.data.books.map(book => {
              return <Book
                key={book.token}
                imgLink={book.imageURL}
                title={book.title}
              />
            })} */}
            
            </div>
            )
            
          

          })}
          <Route path="/books" component={BookView}/>

        </div>
      )
    } else {
      return (
        <div className="App">
          <FacebookLogin
            appId="278986532805098"
            autoLoad={true}
            fields="name,email,friends,picture"
            scope="public_profile,user_friends"
            callback={(response)=> {
              console.log(response)
              this.setState({facebookObj: response})
              this.setState({friendData: this.state.facebookObj.friends.data})
              //this.getFriendsData()
            }} />
          {/* <input onChange={this.onChangeUserToken} placeholder = "유저토큰"></input>
          <input onChange={this.onChangeFriendTokens} placeholder = "친구토큰"></input>
          <button onClick={this.getFriendsData}>클릭</button> */}
        </div>
      )

    }

  }
  
  imageClick() {
    
  }

  onChangeUserToken(e) {
    this.setState({userToken: e.currentTarget.value});
  }
  onChangeFriendTokens(e) {
    this.setState({friendToken: e.currentTarget.value});
  }
  getFriendsData() {
    let data2 = this.state.facebookObj.friends.data
    console.log(data2)
    let data = "["+(this.state.facebookObj.friends.data.map((e)=>{return '"'+e.id+'"'}).join(","))+"]";
    console.log(data)
    axios.post('/fetch/friends_', {
      friendList: data
    })
      .then(response => {
        console.log(response.data.data)
        this.setState({ friendData: response.data.data })
        console.log(response)
        this.render()
      })
      .catch(response => { console.log(response) });
  }
}

