import { User, Role, CellCarrier, AccessGroup, NotificationType, Status } from '../db/DatabaseConnector'

export default class UserService {

  static addDefault = function(){
    let roleId
    let cellCarrierId
    let accessGroupId
    let notificationTypeId
    let statusId

    return Role.findOne({where: {name: 'admin'}})
      .then((role) => {
        roleId = role.id
      })
      .then(() => CellCarrier.findOne({where: {name: 'Verizon'}})
        .then((cellCarrier) => {cellCarrierId = cellCarrier.id})
      )
      .then(() => AccessGroup.findOne({where: {name: 'Default'}})
        .then((accessGroup) => {accessGroupId = accessGroup.id})
      )
      .then(() => NotificationType.findOne({where: {name:'email'}})
        .then((notificationType) => {notificationTypeId = notificationType.id})
      )
      .then(() => Status.findOne({where: {name:'Incomplete'}})
        .then((status) => {statusId = status.id})
      )
      .then(() => User.create({
        first: 'admin',
        last : 'instrator',
        phone: '000000000',
        email: 'admin@admin.admin',
        username: 'admin',
        password: 'f75c002cda45152e3c31721acd0372527aeaf94fcf0fdee05466e3f91c7c1129',
        key: 'OJ3TS4BTIY7TA4LTGF3FW5SCMY7V2P3J',
        salt: '466c37497d4a705e744f4e4b3e732135624f503e5646507432764776513e396b',
        qrData: 'otpauth://totp/admin?secret=OJ3TS4BTIY7TA4LTGF3FW5SCMY7V2P3J',
        lastAttempt: null,
        failedAttempts: null,
        accountResetPassphraseOne: '466c37497d4a705e744f4e4b3e732135624f503e5646507432764776513e396b',
        accountResetPassphraseTwo: '466c37497d4a705e744f4e4b3e732135624f503e5646507432764776513e396b',
        passwordReset: '1504918297137.342',
        RoleId: roleId,
        CellCarrierId: cellCarrierId,
        AccessGroupId: accessGroupId,
        NotificationTypeId: notificationTypeId,
        StatusId: statusId
      })
    )
  }

}


