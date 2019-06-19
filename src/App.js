import React from 'react';
import Book from './Book/Book'

import axios from 'axios'
import { Route, Switch } from 'react-router-dom';

import './App.css'
import FacebookLogin from 'react-facebook-login';
import BookView from './BookView';

const responseFacebook = (response) => {

}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bookDatas: Object,
      selfToken: String,
      friendToken: String,
      friendData: null
    }

    this.getFriendsData = this.getFriendsData.bind(this);
    this.onChangeFriendTokens = this.onChangeFriendTokens.bind(this);
    this.onChangeUserToken = this.onChangeUserToken.bind(this);
    this.getBooks = this.getBooks.bind(this);
  }

  render() {
    
    if (this.state.friendData != null) {
      return (
        
        <div className="App">
          {this.state.friendData.map(item => {
            return (
            <div className="profile">

            <img src = { 'https://graph.facebook.com/'+item.id+'/picture?type=small' } onClick={(e) => this.imageClick(item.id, e)}/>
            <span>{item.name}</span>
            </div>
            )
          })}
          <div>
          {/* {this.state.bookDatas.data.books.map(book => {
              return <Book
                key={book.token}
                imgLink={book.imageURL}
                title={book.title}
              />
            })} */}
          </div>
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
              this.setState({friendData: response.friends.data})
              //this.getFriendsData()
            }} />
          {/* <input onChange={this.onChangeUserToken} placeholder = "유저토큰"></input>
          <input onChange={this.onChangeFriendTokens} placeholder = "친구토큰"></input>
          <button onClick={this.getFriendsData}>클릭</button> */}
        </div>
      )

    }

  }
  
  imageClick(id,e) {
    console.log(id);
    console.log(e)

    this.getBooks(id);
  }

  onChangeUserToken(e) {
    this.setState({userToken: e.currentTarget.value});
  }
  onChangeFriendTokens(e) {
    this.setState({friendToken: e.currentTarget.value});
  }
  getBooks(friendID) {
    let data = "["+(friendID)+"]";
    axios.post('/fetch/friends_', {
      friendList: data
    })
      .then(response => {
        console.log(response.data.data)
        this.setState({ bookDatas: response.data.data })
        console.log(response)
        this.render()
      })
      .catch(response => { console.log(response) });
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

