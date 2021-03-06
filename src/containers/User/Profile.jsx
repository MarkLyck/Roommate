import React from 'react';
import {Link} from 'react-router'

import store from '../../store'
import ChatView from '../../components/User/ChatView'
import './styles/profile.css';
import { getUsers, getPreferences } from '../../helpers'

class Profile extends React.Component {
  constructor(props) {
      super(props)

      this.getStance = this.getStance.bind(this)

      // let profile
      // if(this.props.pathname !== '/profile') {
      //   if (this.props.params) {
      //     profile = store.profiles.data.filter((profile) => {
      //       if (profile.id === this.props.params.id)
      //         return true
      //       else return false
      //     })[0]
      //   } else {
      //     // TODO this should pull profile from room profile.
      //     profile = store.session.data
      //   }
      // } else {
      //   profile = store.session.data
      // }
      //
      // const preference = store.preferences.data.filter((preference) => {
      //   if (preference.profile === profile.email)
      //     return true
      //   else
      //     return false
      // })[0]

      this.state = {
        profile: null,
        preference: null,
        chatting: false
      }
    }
  componentWillReceiveProps(newProps) {
    if (newProps.email) {
      getUsers().then((profiles) => {
        profiles.forEach((profile) => {
          if (profile.email === newProps.email) {
              getPreferences(profile.email).then((preference) => {
                this.setState({ profile: profile, preference: preference })
            })
          }
        })
      })
    }
  }

  componentDidMount() {
    if (store.profiles.data.length) {
      if(this.props.pathname !== '/profile') {
        if (this.props.params) {

        }
      }
    } else {
      getUsers().then((profiles) => {
        if(this.props.pathname !== '/profile') {
          if (this.props.email) {
          } else if (this.props.params) {
            profiles.forEach((profile) => {
              if (profile.email === this.props.params.id) {
                  getPreferences(profile.email).then((preference) => {
                    this.setState({ profile: profile, preference: preference })
                })
              }
            })
          }
        } else {
          this.setState({ profile: store.session.data, preference: store.session.preference })
        }
      })
    }


  }

  getStance(stance) {
    if (typeof stance === 'string' || typeof stance === 'number') {
      return stance
    } else if (stance === null) {
      return 'doesn\'t matter'
    } else if (stance === true) {
      return 'yes'
    } else {
      return 'no'
    }
  }

  render() {
    if (!this.state.profile)
      return <div/>
    const profile = this.state.profile
    const preference = this.state.preference

    return (

      <div className="profile-page">
        <div className="profile-img" style={{backgroundImage: `url(${profile.image_url})`}}/>
        <h1 className="name">{profile.first_name} {profile.last_name.split('')[0]}.</h1>

        <section className="content">
          <ul className="info-list">
            <li className="info-item">
              <h4>Gender:</h4><h4>{profile.sex}</h4>
            </li>
            <li className="info-item">
              <h4>Age:</h4><h4>{profile.age}</h4>
            </li>
            <li className="info-item">
              <h4>Smoker:</h4><h4>{profile.is_smoker ? 'yes' : 'no'}</h4>
            </li>
            <li className="info-item">
              <h4>Has Pets:</h4><h4>{profile.has_pets ? 'yes' : 'no'}</h4>
            </li>
            <li className="info-item">
              <h4>Has Children:</h4><h4>{profile.has_children ? 'yes' : 'no'}</h4>
            </li>
            <li className="info-item">
              <h4>LGBTQ Friendly:</h4><h4>{profile.lgbtq_friendly ? 'yes' : 'no'}</h4>
            </li>
            <li className="info-item">
              <h4>Relationship Status:</h4><h4>{profile.relationship_status}</h4>
            </li>
            <li className="info-item">
              <h4>Temperament</h4><h4>{profile.temperament}</h4>
            </li>
          </ul>
        </section>

        <h1 className="name">Roommate criteria</h1>

        <section className="content">
          <ul className="info-list">
            <li className="info-item">
              <h4>Gender:</h4><h4>{this.getStance(preference.sex)}</h4>
            </li>
            <li className="info-item">
              <h4>Age:</h4><h4>{this.getStance(preference.minimum_age)} - {this.getStance(preference.maximum_age)}</h4>
            </li>
            <li className="info-item">
              <h4>Smoker:</h4><h4>{this.getStance(preference.is_smoker)}</h4>
            </li>
            <li className="info-item">
              <h4>Has Pets:</h4><h4>{this.getStance(preference.has_pets)}</h4>
            </li>
            <li className="info-item">
              <h4>Has Children:</h4><h4>{this.getStance(preference.has_children)}</h4>
            </li>
            <li className="info-item">
              <h4>LGBTQ Friendly:</h4><h4>{this.getStance(preference.lgbtq_friendly)}</h4>
            </li>
            <li className="info-item">
              <h4>Relationship Status:</h4><h4>{this.getStance(preference.relationship_status)}</h4>
            </li>
            <li className="info-item">
              <h4>Temperament</h4><h4>{this.getStance(preference.temperament)}</h4>
            </li>
          </ul>
        </section>

        {this.state.chatting ? <ChatView profile={profile} /> : ''}
        {profile.email !== store.session.data.email ? <a className="button is-primary floating-round-btn" onClick={() => this.setState({ chatting: !this.state.chatting })}><i className="material-icons">message</i></a> : <Link className="button is-primary edit floating-round-btn" to="/profile/edit"><i className="material-icons">edit</i></Link>}
      </div>
    );
  }
}

export default Profile;
