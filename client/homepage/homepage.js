
Template.homepage.rendered = function () {
  Meteor.subscribe('alloweditems');
  Meteor.subscribe('denieditems');
  Meteor.subscribe('observeditems');
  setTimeout(function() {
    console.clear();
    throw new Error('rendered');
  }, 0);
};

Template.homepage.events({
  'click #call-method-client': function testEventHandler (e) {
    console.clear();
    callMethodWithClientError();
  },

  'click #call-method-server': function testEventHandler (e) {
    console.clear();
    callMethodWithServerError();
  },

  'click #call-subscribe-client': function testEventHandler (e) {
    console.clear();
    callSubscriptionWithClientError();
  },

  'click #call-subscribe-server': function testEventHandler (e) {
    console.clear();
    callSubscriptionWithServerError();
  },

  'click #call-collection-insert-client': function testEventHandler (e) {
    console.clear();
    callAllowedItemInsert();
  },

  'click #call-collection-insert-server': function testEventHandler (e) {
    console.clear();
    callDeniedItemInsert();
  },

  'click #call-collection-update-client': function testEventHandler (e) {
    console.clear();
    callAllowedItemUpdate();
  },

  'click #call-collection-update-server': function testEventHandler (e) {
    console.clear();
    callDeniedItemUpdate();
  },

  'click #call-collection-upsert-client': function testEventHandler (e) {
    console.clear();
    callAllowedItemUpsert();
  },

  'click #call-collection-upsert-server': function testEventHandler (e) {
    console.clear();
    callDeniedItemUpsert();
  },

  'click #call-collection-remove-client': function testEventHandler (e) {
    console.clear();
    callAllowedItemRemove();
  },

  'click #call-collection-remove-server': function testEventHandler (e) {
    console.clear();
    callDeniedItemRemove();
  },

  'click #call-observe-change-added': function testEventHandler (e) {
    console.clear();
    callObserveChangesAdded();
  },

  'click #call-observe-change-changed': function testEventHandler (e) {
    console.clear();
    callObserveChangesChanged();
  },

  'click #call-observe-change-removed': function testEventHandler (e) {
    console.clear();
    callObserveChangesRemoved();
  },

  'click #call-observe-change-addedAt': function testEventHandler (e) {
    console.clear();
    callObserveChangesAddedAt();
  },

  'click #call-observe-change-changedAt': function testEventHandler (e) {
    console.clear();
    callObserveChangesChangedAt();
  },

  'click #call-observe-change-removedAt': function testEventHandler (e) {
    console.clear();
    callObserveChangesRemovedAt();
  },

  'click #call-observe-change-movedTo': function testEventHandler (e) {
    console.clear();
    callObserveChangesMovedTo();
  },
});

function callMethodWithClientError () {
  Meteor.call('test-method', function testCallback (error, result) {
    throw new Error('method');
  });
}

function callMethodWithServerError () {
  Meteor.call('test-method');
}

function callSubscriptionWithClientError (callback) {
  Meteor.subscribe('test-publication-ready', function testCallback (error) {
    throw new Error('subscription ready');
  });
}

function callSubscriptionWithServerError (callback) {
  Meteor.subscribe('test-publication-error');
}

function callAllowedItemInsert () {
  AllowedItems.insert({_id: 'foobar'}, function (error, result) {
    throw new Error();
  });
}

function callDeniedItemInsert () {
  DeniedItems.insert({_id: 'foobar'});
}

function callAllowedItemUpdate () {
  AllowedItems.update({_id: 'foobar'}, {$set: {foo: 'bar'}}, function (error, count) {
    throw new Error();
  });
}

function callDeniedItemUpdate () {
  var doc = {_id: 'foobar', foo: 'bar'};
  Meteor.call('createDeniedItem', doc, function (error, result) {
    DeniedItems.update({_id: 'foobar'}, {$set: {foo: 'baz'}}, function (error, count) {
      Meteor.call('clear');
    });
  });
}

function callAllowedItemUpsert () {
  AllowedItems.upsert({_id: 'foobar'}, {$set: {foo: 'bar'}}, function (error, count) {
    throw new Error();
  });
}

function callDeniedItemUpsert () {
  DeniedItems.upsert({_id: 'foobar'}, {$set: {foo: 'bar'}});
}

function callAllowedItemRemove () {
  AllowedItems.remove({_id: 'foobar'}, function (error, count) {
    throw new Error();
  });
}

function callDeniedItemRemove () {
  var doc = {_id: 'foobar', foo: 'bar'};
  Meteor.call('createDeniedItem', doc, function (error, result) {
    DeniedItems.remove({_id: 'foobar'}, function (error, count) {
      Meteor.call('clear');
    });
  });
}

function callObserveChangesAdded () {
  Meteor.call('clear', function (error, result) {
    ObservedItems.find({observeType: 'added'}).observe({
      added: function (document) {
        ObservedItems.remove({_id: 'foobar'});
        throw new Error('added');
      }
    });
    ObservedItems.insert({_id: 'foobar', observeType: 'added'});
  });
}

function callObserveChangesAddedAt () {
  Meteor.call('clear', function (error, result) {
    ObservedItems.find({observeType: 'addedAt'}).observe({
      addedAt: function (document) {
        ObservedItems.remove({_id: 'foobar'});
        throw new Error('addedAt');
      }
    });
    ObservedItems.insert({_id: 'foobar', observeType: 'addedAt'});
  });
}

function callObserveChangesChanged () {
  Meteor.call('clear', function (error, result) {
    ObservedItems.find({observeType: 'changed'}).observe({
      changed: function (document) {
        ObservedItems.remove({_id: 'foobar'});
        throw new Error('changed');
      }
    });
    ObservedItems.insert({_id: 'foobar', observeType: 'changed'});
    ObservedItems.update({_id: 'foobar'}, {$set: {foo: 'bar'}});
  });
}

function callObserveChangesChangedAt () {
  Meteor.call('clear', function (error, result) {
    ObservedItems.find({observeType: 'changedAt'}).observe({
      changedAt: function (document) {
        ObservedItems.remove({_id: 'foobar'});
        throw new Error('changedAt');
      }
    });
    ObservedItems.insert({_id: 'foobar', observeType: 'changedAt'});
    ObservedItems.update({_id: 'foobar'}, {$set: {foo: 'bar'}});
  });
}

function callObserveChangesRemoved () {
  Meteor.call('clear', function (error, result) {
    ObservedItems.find({observeType: 'removed'}).observe({
      removed: function (document) {
        throw new Error('removed');
      }
    });
    ObservedItems.insert({_id: 'foobar', observeType: 'removed'});
    ObservedItems.remove({_id: 'foobar'});
  });
}

function callObserveChangesRemovedAt () {
  Meteor.call('clear', function (error, result) {
    ObservedItems.find({observeType: 'removedAt'}).observe({
      removedAt: function (document) {
        throw new Error('removedAt');
      }
    });
    ObservedItems.insert({_id: 'foobar', observeType: 'removedAt'});
    ObservedItems.remove({_id: 'foobar'});
  });
}

function callObserveChangesMovedTo () {
  Meteor.call('clear', function (error, result) {
    var options = {sort: {value: 1}};
    ObservedItems.find({observeType: 'movedTo'}, options).observe({
      movedTo: function (document) {
        ObservedItems.remove({_id: 'foobar'});
        ObservedItems.remove({_id: 'foobaz'});
        throw new Error('movedTo');
      }
    });
    ObservedItems.insert({_id: 'foobar', observeType: 'movedTo', value: 10});
    ObservedItems.insert({_id: 'foobaz', observeType: 'movedTo', value: 20});
    ObservedItems.update({_id: 'foobar'}, {$set: {value: 30}});
  });
}
