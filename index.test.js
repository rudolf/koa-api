const test = require('tape');

test('Tests pass', (assert) => {
//  assert.pass('This test passes');
  assert.fail('This test fails');
  assert.end();
});
