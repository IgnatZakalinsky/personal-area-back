import {Request, Response} from 'express'
import axios from 'axios'
import {status400, status500} from '../../../p1-common/c1-errors/errors'
import {resCookie} from '../../../p2-main/cookie'

export const instance = axios.create({
    baseURL: 'https://labs-api.staging.it-kamasutra.com/',
    headers: {'FRIEND-KEY': process.env.FRIEND_KEY}
})

export const logIn = async (req: Request, res: Response) => {
    const {token} = req.body
    if (token) {
        try {
            const p = await instance.post(
                'api/friends/auth/login',
                {tempPassword: token}
            )
            console.log('ok: ', {...p.data})

            if (p.data.resultCode === 1) {
                status400(res, p.data.messages[0], "login")
            } else {
                resCookie(res, p.data.data.token).status(200).json(p.data.data)
            }
        } catch (e) {
            console.log('error: ', {...e})
            status500(res, {...e}, "login", {token})
        }
    } else status400(res, "no token in body!", "login", {body: req.body})
};
