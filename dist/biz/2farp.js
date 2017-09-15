'use strict';

var _DatabaseConnector = require('../db/DatabaseConnector');

_DatabaseConnector.Database.authenticate().then(function () {
  return console.log('Beginning database sync');
}).then(function () {
  return _DatabaseConnector.Database.sync({ force: true, match: /_dev$/ });
}).then(function () {
  return console.log('Creating Database');
}).then(function () {
  _DatabaseConnector.Option.bulkCreate([{ key: 'Force email as username', value: 'false' }, { key: 'Enable "Account Signup"', value: 'false' }, { key: 'Enable "Update Profile"', value: 'false' }, { key: 'Default session timeout (ms)', value: '36000' }, { key: 'Notify admins when accounts lock', value: 'false' }, { key: 'Notify user when account locks', value: 'false' }, { key: 'Password expiration minimum policy (days)', value: '90' }, { key: 'Password expiration maximum policy (days)', value: '90' }, { key: 'Password expiration soft notification (days)', value: '90' }, { key: 'Password expiration hard notification (days)', value: '90' }, { key: 'Account lock policy (attempts)', value: '99' }, { key: 'Java Mail Options', value: 'Not Configured' }]);
}).then(function () {
  _DatabaseConnector.Status.bulkCreate([{ name: 'incomplete' }, { name: 'complete' }, { name: 'locked' }, { name: 'revoked' }]);
}).then(function () {
  _DatabaseConnector.Role.bulkCreate([{ name: 'admin' }, { name: 'user' }]);
}).then(function () {
  _DatabaseConnector.NotificationType.bulkCreate([{ name: 'email' }, { name: 'phone' }]);
}).then(function () {
  return _DatabaseConnector.AccessGroup.create({ name: 'default' });
}).then(function () {
  return _DatabaseConnector.Route.create({ name: 'default', path: '/', destination: 'http://localhost:8080/', authenticated: false });
}).then(function () {
  return _DatabaseConnector.CellCarrier.create({ name: 'Verizon', domain: 'vzwpix.com' });
}).then(function () {
  return console.log('Database Created');
});