
Template.homepage.rendered = function () {
  callMethod('rendered');
};

Template.homepage.events({
  'click #call-method': function testEventHandler (e) {
    callMethod('event');
  },

  'click #call-subscribe-ready': function testEventHandler (e) {
    callReadySubscription('event');
  },

  'click #call-subscribe-error': function testEventHandler (e) {
    callErrorSubscription('event');
  },

  'click #call-collection-insert-client': function testEventHandler (e) {
    callAllowedItemInsert();
  },

  'click #call-collection-insert-server': function testEventHandler (e) {
    callDeniedItemInsert();
  },

  'click #call-collection-update-client': function testEventHandler (e) {
    callAllowedItemUpdate();
  },

  'click #call-collection-update-server': function testEventHandler (e) {
    callDeniedItemUpdate();
  },

  'click #call-collection-upsert-client': function testEventHandler (e) {
    callAllowedItemUpsert();
  },

  'click #call-collection-upsert-server': function testEventHandler (e) {
    callDeniedItemUpsert();
  },

  'click #call-collection-remove-client': function testEventHandler (e) {
    callAllowedItemRemove();
  },

  'click #call-collection-remove-server': function testEventHandler (e) {
    callDeniedItemRemove();
  }
});

function callMethod (n) {
  Meteor.call('test-method', n, function testCallback (error, result) {
    if(error) {
      throw error;
    }
  });
}

function callReadySubscription (n, callback) {
  Meteor.subscribe('test-publication-ready', n, function testCallback (error, result) {
    throw new Error('');
  });
}

function callErrorSubscription (n, callback) {
  Meteor.subscribe('test-publication-error', n, {
    onError: function testCallback (error) {
      if(error) {
        throw error;
      }
    }
  });
}

function callAllowedItemInsert () {
  AllowedItems.insert({_id: 'foobar'}, function (error, result) {
    throw new Error('');
  });
}

function callDeniedItemInsert () {
  DeniedItems.insert({_id: 'foobar'}, function (error, result) {
    if(error) {
      throw error;
    }
  });
}

function callAllowedItemUpdate () {
  AllowedItems.update({_id: 'foobar'}, {$set: {foo: 'bar'}}, function (error, count) {
    throw new Error('');
  });
}

function callDeniedItemUpdate () {
  DeniedItems.update({_id: 'foobar'}, {$set: {foo: 'bar'}}, function (error, count) {
    if(error) {
      throw error;
    }
  });
}

function callAllowedItemUpsert () {
  AllowedItems.upsert({_id: 'foobar'}, {$set: {foo: 'bar'}}, function (error, count) {
    throw new Error('');
  });
}

function callDeniedItemUpsert () {
  DeniedItems.upsert({_id: 'foobar'}, {$set: {foo: 'bar'}}, function (error, count) {
    if(error) {
      throw error;
    }
  });
}

function callAllowedItemRemove () {
  AllowedItems.remove({_id: 'foobar'}, function (error, count) {
    throw new Error('');
  });
}

function callDeniedItemRemove () {
  DeniedItems.remove({_id: 'foobar'}, function (error, count) {
    if(error) {
      throw error;
    }
  });
}
