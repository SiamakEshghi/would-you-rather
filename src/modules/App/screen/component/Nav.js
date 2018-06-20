import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap'; 

class Nav extends Component {
    logOut = () => {
        this.props.logOut()
    }
    render() {
        const { currentUser } = this.props
        if(!currentUser) {
            return <div></div>
        }
        return(
            <div>
                <div className='nav'>
                    <nav >
                        <ul>
                            <li>
                            <NavLink to='/dashboard' exact>
                                Dashboard
                            </NavLink>
                            </li>
                            <li>
                            <NavLink to='/new'>
                                New Question
                            </NavLink>
                            </li>
                            <li>
                            <NavLink to='/board'>
                                Board
                            </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <h5>{currentUser.name}</h5>
                        <Image 
                            style={styles.image}
                            src={currentUser.avatarURL} 
                        /> 
                        <Button onClick={this.logOut}>Logout</Button>
                    </div>
                </div>
                <h3>--------------------------------------------------</h3>
            </div>
         );
    }        
   
}
const styles = {
    text: {
        textAlign: 'center'
    },
    image: {
        height: 50,
        width: 50
    }
}

const mapStateToProps = ({ pub }) => {
    const { currentUser } = pub;
    
   return { currentUser }
} 
export default connect(mapStateToProps)(Nav);
