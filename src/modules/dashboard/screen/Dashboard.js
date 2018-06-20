import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from '../component/Card/Card';


class Dashboard extends Component {
    
    render() {
        const { unansweredId, answeredId, questions} = this.props;
        return(
            <div>
                <h1>------------------------  New Questions  --------------------------</h1>
                <div>
                    <ListGroup>
                        {unansweredId.map(id => {
                            const unansweredQuestion = questions[id];
                            return(
                                <ListGroupItem 
                                key={id}
                                onClick={()=> console.log(id)}>
                                    <Card question={unansweredQuestion} />
                                </ListGroupItem>
                             );
                           })
                        }
                    </ListGroup>
                </div>
                <h1>------------------------  Done  --------------------------</h1>
                <div>
                    <ListGroup>
                        {answeredId.map(id => {
                            const answeredQuestion = questions[id];
                            return(
                                <ListGroupItem 
                                key={id}
                                onClick={()=> console.log(id)}>
                                    <Card question={answeredQuestion} />
                                 </ListGroupItem>
                            );
                          })
                        }
                    </ListGroup>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ pub }) => {
    const { questions, currentUser } = pub
   
    const answeredId = (currentUser && questions) ? Object.keys(currentUser.answers).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
      ) : [];
    const unansweredId = questions ? Object.keys(questions)
    .filter(question => {
        return answeredId.indexOf(question) === -1;
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp) : [];
    return {answeredId, unansweredId, questions}
} 
export default connect(mapStateToProps)(Dashboard);