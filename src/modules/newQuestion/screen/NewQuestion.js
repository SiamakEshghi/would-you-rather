import React, { Component } from 'react';
import {connect} from 'react-redux';
import { saveNewQuestion } from '../../../Public/actions';

class NewQuestion extends Component {
    state = {
        firstOption: '',
        secondOption: '',
        isDone: false
    }

    handleChange = (e, order) => {
        const text = e.target.value
    
        switch (order) {
            case 'first':
                this.setState(() => ({
                    firstOption: text
                }));
                break
            case 'second':
                this.setState(() => ({
                    secondOption: text
                }));
                break
            default:
                return
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { currentUser, saveNewQuestion } = this.props;
        const { firstOption, secondOption } = this.state;
        saveNewQuestion(currentUser.id, firstOption, secondOption, () => 
        this.setState({ isDone: true }));  
    }
    render(){
       if (this.state.isDone) {
           return (
                <div>
                    <h2>New Question is saved!</h2>
                    <button onClick={() => this.setState({ isDone: false })}>
                        Done!
                    </button>
                </div>
            );
        } 

        return(
            <div>
                <h1>Creat new question</h1>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea
                    placeholder="First Option"
                    onChange={ (e) => this.handleChange(e, 'first')}
                    />
                    <textarea
                    placeholder="Second Option"
                    onChange={(e) => this.handleChange(e, 'second')}
                    />
                    <div>
                        <button type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = ({ pub }) => {
    const { currentUser, questions } = pub;
    return { currentUser, questions };
}

export default connect(mapStateToProps, { saveNewQuestion })(NewQuestion);