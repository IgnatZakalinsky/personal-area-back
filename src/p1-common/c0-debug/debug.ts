import {IS_DEVELOPER_VERSION} from '../../p0-config/config'

export const log = (...args: any[]) => {
    if (IS_DEVELOPER_VERSION) console.log(...args)
}
