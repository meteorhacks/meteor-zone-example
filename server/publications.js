
Meteor.publish('alloweditems', function () {
  return AllowedItems.find({});
});

Meteor.publish('denieditems', function () {
  return DeniedItems.find({});
});

Meteor.publish('observeditems', function () {
  return ObservedItems.find({});
});

Meteor.publish('test-publication-ready', function () {
  return this.ready();
});

Meteor.publish('test-publication-error', function () {
  throw new Meteor.Error(599, 'Something went wrong');
});
