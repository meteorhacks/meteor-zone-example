
if(Meteor.isServer) {
  Meteor.startup(function () {
    AllowedItems.remove({});
    DeniedItems.remove({});
    ObservedItems.remove({});
  });
}

AllowedItems = new Meteor.Collection('alloweditems');
AllowedItems.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

DeniedItems = new Meteor.Collection('denieditems');
DeniedItems.allow({
  insert: function (userId, doc) {
    return false;
  },
  update: function (userId, doc, fields, modifier) {
    return false;
  },
  remove: function (userId, doc) {
    return false;
  },
});
