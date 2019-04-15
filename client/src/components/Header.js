import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login With Google</a></li>
        );

      default:
        return (
          <li><a href="/api/logout">Logout</a></li>
        );
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps.auth !== this.props.auth);
  //   return nextProps.auth !== this.props.auth;
  // }
  
  render() {
    return (
      <nav>
        <div className="nav-wrapper teal lighten-2">
          <Link 
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Snacks Builder
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
      
    )
  }
}

function mapStateToProps ({ auth }) {
  console.log(auth);
  return { auth };
}

export default connect(mapStateToProps)(Header);