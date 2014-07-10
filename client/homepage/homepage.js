
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
  }
});

function callMethod (n) {
  Meteor.call('test-method', n, function testCallback (error, result) {
    throw error;
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
      throw error;
    }
  });
}
