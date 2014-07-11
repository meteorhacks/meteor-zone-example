
Meteor.methods({
  'test-method': function (msg) {
    throw new Meteor.Error('~ test method error ~ '+msg+' ~');
  }
});

Meteor.methods({
  clear: function () {
    AllowedItems.remove({});
    DeniedItems.remove({});
    ObservedItems.remove({});
  }
});
