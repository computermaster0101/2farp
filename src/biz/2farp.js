import { Database, AccessGroup, AccessGroupRule,
  CellCarrier, NotificationType, Option, Role,
  Route, Status, User } from '../db/DatabaseConnector'

Database.authenticate()
  .then(() => console.log(`Beginning database sync`))
  .then(() => Database.sync({ force: true, match: /_dev$/ }))
  .then(() => console.log(`Creating Database`))
  .then(() => {
    Option.bulkCreate([
    {key: 'Force email as username', value: 'false'},
    {key: 'Enable "Account Signup"', value: 'false'},
    {key: 'Enable "Update Profile"', value: 'false'},
    {key: 'Default session timeout (ms)', value: '36000'},
    {key: 'Notify admins when accounts lock', value: 'false'},
    {key: 'Notify user when account locks', value: 'false'},
    {key: 'Password expiration minimum policy (days)', value: '90'},
    {key: 'Password expiration maximum policy (days)', value: '90'},
    {key: 'Password expiration soft notification (days)', value: '90'},
    {key: 'Password expiration hard notification (days)', value: '90'},
    {key: 'Account lock policy (attempts)', value: '99'},
    {key: 'Java Mail Options', value: 'Not Configured'}])
  })
  .then(() => {
    Status.bulkCreate([
      {name: 'incomplete'},
      {name: 'complete'},
      {name: 'locked'},
      {name: 'revoked'}])
  })
  .then(() => {
    Role.bulkCreate([
      {name: 'admin'},
      {name: 'user'}])
  })
  .then(() => {
    NotificationType.bulkCreate([
      {name: 'email'},
      {name: 'phone'}])
  })
  .then(() => AccessGroup.create({name: 'default'}))
  .then(() => Route.create({name: 'default', path: '/', destination: 'http://localhost:8080/', authenticated: false}))
  .then(() => CellCarrier.create({name: 'Verizon', domain: 'vzwpix.com'}))
  .then(() => console.log(`Database Created`))