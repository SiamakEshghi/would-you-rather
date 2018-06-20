import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

class Board extends Component {
    render() {
        const { users, userIdList } = this.props;
        if(users.length === 0 || userIdList === 0) {
            return(
                <div></div>
            );
        }
        return(
            <table style={{width: '100%'}}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Answered</th> 
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {userIdList.map((id) => {
                        const user = users[id];
                        return (
                            <tr key={id}>
                              <td style={styles.text}>
                                        <Image 
                                            style={styles.image}
                                            src={user.avatarURL} 
                                        /> 
                                        <h2>{user.name}</h2>
                                        <h3>{user.id}</h3>
                                </td>
                                <td style={styles.text}>{Object.keys(user.answers).length}</td> 
                                <td style={styles.text}>{user.questions.length}</td>
                            </tr>
                        )}
                        )}   
                    
                </tbody>
            </table>
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
    const { users } = pub;
    const userIdList = Object.keys(users).sort(
        (a, b) =>
        Object.keys(users[b].answers).length +
        users[b].questions.length -
        (Object.keys(users[a].answers).length + users[a].questions.length)
    );
   return {users, userIdList}
} 

export default connect(mapStateToProps)(Board);