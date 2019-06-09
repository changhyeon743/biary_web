import React from 'react';
import Book from './Book/Book'
import axios from 'axios'
import './App.css'
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selfToken: String,
      friendToken: String,
      friendData: null
    }

    this.getFriendsData = this.getFriendsData.bind(this);
    this.onChangeFriendTokens = this.onChangeFriendTokens.bind(this);
    this.onChangeUserToken = this.onChangeUserToken.bind(this);
  }

  render() {
    if (this.state.friendData != null) {
      return (
        <div className="App">
          {this.state.friendData.map(item => {
            return (
            <div>
            <div className="profile">
            <img src = {item.data.user.profileURL}/>
            <span>{item.data.user.name}</span>
            </div>
            {item.data.books.map(book => {
              return <Book
                key={book.token}
                imgLink={book.imageURL}
                title={book.title}
              />
            })}
            </div>
            )
          
          

          })}
          
        </div>
      )
    } else {
      return (
        <div className="App">
          <FacebookLogin
            appId="278986532805098"
            autoLoad={true}
            fields="name,email,friends,picture"
            callback={responseFacebook} />
          <input onChange={this.onChangeUserToken} placeholder = "유저토큰"></input>
          <input onChange={this.onChangeFriendTokens} placeholder = "친구토큰"></input>
          <button onClick={this.getFriendsData}>클릭</button>
        </div>
      )

    }

  }

  onChangeUserToken(e) {
    this.setState({userToken: e.currentTarget.value});
  }
  onChangeFriendTokens(e) {
    this.setState({friendToken: e.currentTarget.value});
  }
  getFriendsData() {
    axios.post('/fetch/friend', {
      userToken: this.state.userToken,
      friendList: this.state.friendToken
    })
      .then(response => {
        this.setState({ friendData: response.data.data })
        console.log(this.state.friendData)
        this.render()
      })
      .catch(response => { console.log(response) });
  }
}

