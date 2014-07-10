
Meteor.publish('test-publication-ready', function () {
  return this.ready();
});

Meteor.publish('test-publication-error', function () {
  throw new Meteor.Error(599, 'Something went wrong');
});
