import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux';
// import LoadingBar from 'react-redux-loading'
import Dashboard from '../../dashboard/screen/Dashboard';
import NewQuestion from '../../newQuestion/screen/NewQuestion';
import Board from '../../board/screen/Board'
import Question from '../../Question/screen/Question'
import Nav from './component/Nav';
import Login from '../../login/screen/Login';
import { logOut } from '../../login/actions';

class App extends Component {
  logOut = () => {
    this.props.logOut();
  }
  render() {
    const { isLogged } = this.props;
    const NotValid =  ({ location }) => (
                        <div>
                          <h2>
                            Error 404
                          </h2>
                          <h3>
                            No match for <code>{location.pathname}</code>
                          </h3>
                          <Link to='/'>Please Login First</Link>
                        </div>
                      );
    
    if (!isLogged) {
      return (
        <Router>
          <Switch>
            <Route exact path='/' exact component={Login} />
            <Route component={NotValid} />
          </Switch>
        </Router>
      );
    }
    return (
      <Router>
      <Fragment>
        <div >
          <Nav logOut={this.logOut}/>
          <div>
            <Switch>
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/add' component={NewQuestion} />
              <Route path='/board' component={Board} />
              <Route path='/questions/:id' component={Question} />
              <Route component={NotValid} />
            </Switch>
          </div>
        </div>
      </Fragment>
    </Router>
      
    );
  }
}


function mapStateToProps({ log }) {
  const isLogged = log.logged ? log.logged : false
  return { isLogged };
}
export default connect(mapStateToProps, { logOut })(App);
