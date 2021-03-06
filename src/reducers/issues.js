import {ISSUES_REQUEST, ISSUES_SUCCESS, ISSUES_FAILURE} from  '../actions/issues';

export default function issues(state = [], action) {
  switch (action.type) {
    case ISSUES_SUCCESS:
      return action.response;
    default:
      return state;
  }
}
