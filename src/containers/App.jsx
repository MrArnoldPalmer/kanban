import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as issueActions from '../actions/issues';

// Babel ES7 decorators not working currently...
// Connect at bottom
// @connect((state) => {
//   return {
//     issues: state.issues
//   }
// })

class Board extends React.Component {
  addIssue() {
    let testIssue = {
      title: 'Test Issue',
      details: 'Test Details'
    };

    this.props.dispatch(issueActions.addIssue(testIssue.title, testIssue.details));
  }
  render() {
    let {issues} = this.props;

    return (
      <div>
        <button onClick={::this.addIssue}>Add Issue!</button>
        <ul>
          {issues.map(issue => {
            return (
              <li>
                Issue Title: {issue.title}
                {issue.details}
                {issue.completed}
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    issues: state.issues
  };
}

export default connect(mapStateToProps)(Board);
