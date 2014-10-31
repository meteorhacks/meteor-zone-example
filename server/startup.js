Meteor.startup(function () {
  AllowedItems.remove({});
  DeniedItems.remove({});
  ObservedItems.remove({});
});
