import {BaseBLL} from '../../../p1-common/c4-bll/BaseBLL-v2'
import {IUser} from '../a0-models/UserModel'
import {UserModel} from '../a3-dal'

export const UserLogic = new BaseBLL<IUser>(UserModel)
