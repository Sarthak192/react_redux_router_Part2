import React, { Component } from 'react';
import {connect} from "react-redux";
import {signIn, signOut} from "../actions"

class GoogleAuth extends Component {

    componentDidMount(){
        window.gapi.load("client:auth2", ()=>{
            //When we call init it returns a promise
            window.gapi.client.init({
                clientId: "364944284050-9eqevoed5ir5kme30eu4n27ds9q2tg3h.apps.googleusercontent.com",
                scope: "email"
            }).then(()=>{
                this.oauth = window.gapi.auth2.getAuthInstance();
                this.onAutChange(this.oauth.isSignedIn.get())
                this.oauth.isSignedIn.listen(this.onAutChange)
            })
        })
    }

    onAutChange = (isSignedIn) => {
        if(isSignedIn){
           return this.props.signIn(this.oauth.currentUser.get().getId())
        }
        else{
            return this.props.signOut()
        }
    }

    onSignIn = () => {
        this.oauth.signIn()
    }

    onSignOut = () => {
        this.oauth.signOut()
    }

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return <div>I dont know if we are signed in</div>
        }
        else if(this.props.isSignedIn){
            return(
                <button onClick = {this.onSignOut} className = "ui red google button">
                    <i className = "google icon"></i>
                    SignOut
                </button>
            )
        }
        else{
            return(
                <button onClick = {this.onSignIn} className = "ui red google button">
                    <i className = "google icon"></i>
                    Signin With Google
                </button>
            )
        }
    }

    render() { 
        return ( 
            <div>
                {this.renderAuthButton()}
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}
 
export default connect(mapStateToProps, {
    signIn, 
    signOut
})(GoogleAuth);