(function () {
  Meteor.loginWithWeibo = function (callback) {
    if (!Meteor.accounts.weibo._clientId || !Meteor.accounts.weibo._appUrl) {
      callback && callback(new Meteor.accounts.ConfigError("Need to call Meteor.accounts.weibo.config first"));
      return;
    }

    var state = Meteor.uuid();
    // XXX need to support configuring access_type and scope
    var loginUrl =
          'https://api.weibo.com/oauth2/authorize' +
          '?response_type=code' +
          '&client_id=' + Meteor.accounts.weibo._clientId +
          '&redirect_uri=' + Meteor.accounts.weibo._appUrl + '/_oauth/weibo?close' +
          '&state=' + state;

    Meteor.accounts.oauth.initiateLogin(state, loginUrl, callback);
  };

}) ();
