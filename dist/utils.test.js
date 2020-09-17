'use strict';

var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');

var _require = require('./utils'),
    replaceIds = _require.replaceIds,
    createSummaryQueryExecutor = _require.createSummaryQueryExecutor;

suite('utils', function () {
  suite('replaceIds', function () {
    test('works', function () {
      assert.deepEqual(replaceIds({ _id: { toHexString: function toHexString() {
            return '42';
          } } }), {
        _id: '42'
      });
    });
  });

  suite('createSummaryQueryExecutor', function () {
    test('works', function (done) {
      var exec = createSummaryQueryExecutor(3);
      var func = sinon.stub().resolves();
      var promises = [exec(func), exec(func), exec(func), exec(func), exec(func)];

      Promise.all(promises).then(function (rs) {
        assert.equal(rs.length, 5);

        assert.equal(func.callCount, 3);
        done();
      });
    });
  });
});