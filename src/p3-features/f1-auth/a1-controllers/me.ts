import {Request, Response} from 'express'
import {status400, status500} from '../../../p1-common/c1-errors/errors'
import {resCookie} from '../../../p2-main/cookie'
import {ADMIN_PASS, instance} from './logIn'

// export const instance = axios.create({
//     baseURL: 'https://labs-api.staging.it-kamasutra.com/',
//     headers: {'FRIEND-KEY': process.env.FRIEND_KEY}
// })

export const me = async (req: Request, res: Response) => {
    const {token} = req.cookies
    if (token) {
        if (token === ADMIN_PASS) {
            resCookie(res, token).status(200).json({isAdmin: true})
        } else {
            try {
                const p = await instance.get('api/friends/auth/students/by-token/' + token)
                console.log('ok: ', {...p})

                // if (p.data.resultCode === 1) {
                //     status400(res, p.data.messages[0], "me")
                // } else {
                resCookie(res, token).status(200).json({...p.data})
                // }
            } catch (e) {
                status500(res, {...e}, "me", {token})
                console.log('error: ', e)
            }
        }
    } else status400(res, "no token in cookies!", "me", {cookies: req.cookies})
};
