
Meteor.methods({
  'test-method': function (msg) {
    throw new Meteor.Error('~ test method error ~ '+msg+' ~');
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
