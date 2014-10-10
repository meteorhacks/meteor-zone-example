
Meteor.methods({
  'test-method': function () {
    throw new Meteor.Error('method');
  },

  clear: function () {
    AllowedItems.remove({});
    DeniedItems.remove({});
    ObservedItems.remove({});
  },

  createDeniedItem: function (doc) {
    DeniedItems.insert(doc);
  }
});
