import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap'; 
import { selectAnswer } from '../../../Public/actions';

class Question extends Component {
    state = {
        isAnswered: false,
    }
    componentDidMount = () => {
        const { currentQuestion, currentUser } = this.props;
        this.isAnswered(currentUser.answers, currentQuestion.id);
    }
    optionTapped = (e, selectedOption) => {
        e.preventDefault();
        const { currentQuestion, currentUser, selectAnswer } = this.props;
        selectAnswer(currentUser.id, currentQuestion.id, 
            selectedOption, () => this.setState({ isAnswered: true }));

    }
    
    isAnswered = (answers, questionId) => {
        if (answers.hasOwnProperty(questionId)) {
            this.setState({ isAnswered: true });
        }else{
            this.setState({ isAnswered: false });
        }   
    }
    getPercent = (question, option) => {
        const numberOfVotesfOptionOne = question.optionOne.votes.length;
        const numberOfVotesfOptionTwo= question.optionTwo.votes.length;
        if (option === 1) {
            return (numberOfVotesfOptionOne / (numberOfVotesfOptionOne + numberOfVotesfOptionTwo)) * 100;
        } else if (option === 2) {
            return (numberOfVotesfOptionTwo / (numberOfVotesfOptionOne + numberOfVotesfOptionTwo)) * 100;
        }
    }
    renderAnsweredOptions = () => {
        
        const { currentQuestion, currentUser, questionAuthor } = this.props;
       
        return (
                <div>
                    <div >
                        <h2>{questionAuthor.name}</h2>
                        <Image 
                            style={styles.image}
                            src={questionAuthor.avatarURL} 
                        /> 
                         <h1>...............................................................</h1>

                    </div>
                    <div>
                        <div>
                            <h2>{currentQuestion.optionOne.text}</h2>
                            <h3>{currentQuestion.optionOne.votes.length}</h3>
                            <h4>{this.getPercent(currentQuestion, 1)} %</h4>
                        </div>
                        <h1>...............................................................</h1>
                        <div>
                            <h2>{currentQuestion.optionTwo.text}</h2>
                            <h3>{currentQuestion.optionTwo.votes.length}</h3>
                            <h4>{this.getPercent(currentQuestion, 2)} %</h4>
                        </div>
                    </div>
                </div>
        );  
    }
    renderNotAnsweredOptions = () => {
        
        const { currentQuestion, currentUser, questionAuthor } = this.props;
        
        return (
                <div>
                    <div >
                        <h1>Would You Rather</h1>
                        <h4>Select an option!</h4>
                        <h2>{questionAuthor.name}</h2>
                        <Image 
                            style={styles.image}
                            src={questionAuthor.avatarURL} 
                        /> 
                         <h1>...............................................................</h1>

                    </div>
                    <div>
                        <div>
                            <h2>{currentQuestion.optionOne.text}</h2>
                            <Button onClick={(e) => this.optionTapped(e, "optionOne")}
                            >Click</Button>
                        </div>
                        <h1>...............................................................</h1>
                        <div>
                            <h2>{currentQuestion.optionTwo.text}</h2>
                            <Button onClick={(e) => this.optionTapped(e, "optionTwo")}
                            >Click</Button>
                        </div>
                    </div>
                </div>
        );  
    }
    render() {
        const { currentQuestion, currentUser } = this.props;
        const { isAnswered } = this.state;
       
        if(currentUser && currentQuestion != null){
            if (isAnswered) {
                return (this.renderAnsweredOptions());
             } else {
                 return (this.renderNotAnsweredOptions());
             }
        } else {
            return <div>There is no question.</div>
        }
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


const mapStateToProps = ({ pub }, props) => {
    const { id } = props.match.params;
    const { questions, currentUser, users } = pub;
    const currentQuestion = questions[id] || null;
    const questionAuthorId = currentQuestion ? currentQuestion.author : null
    const questionAuthor = users[questionAuthorId] || null
    return { currentQuestion, currentUser, questionAuthor };
}
export default withRouter(connect(mapStateToProps, {selectAnswer})(Question));