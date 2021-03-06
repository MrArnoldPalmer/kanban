import should from 'should';
import {fetchRepo, REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE} from '../../actions/repos';
import {CALL_API, Schemas} from '../../middleware/api';

describe('Repo Actions', () => {
  describe('Fetch Repo Action', () => {
    const types = [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE];
    const fullName = 'fullname/string';
    const action = fetchRepo(fullName);

    it('Should return action with CALL_API symbol key', done => {
      action[CALL_API].should.not.be.undefined();
      done();
    });

    it('Action should have correct attributes', done => {
      action[CALL_API].types.should.deepEqual(types);
      action[CALL_API].name.should.equal(fullName);
      action[CALL_API].endpoint.should.equal(`repos/${fullName}`);
      action[CALL_API].schema.should.equal(Schemas.REPO);
      done();
    });
  });
});
