import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'
import escape from 'sql-template-strings'
import { checkPassword } from '../../../lib/user'
import { IUserLogon } from '../../../lib/user'
import nJwt, { JSONMap } from 'njwt'
import { env } from 'node:process'

export default async function AuthorizeCredentials(req: NextApiRequest, res: NextApiResponse) {

    var responseResults: IUserLogon

    const resultsDbUser = await db.query(escape`
        SELECT id, name, email, password, email_verified FROM user_users WHERE user_users.email=${req.body.username}
    `) as Array<any>

    //console.log(resultsDbUser)

    if (resultsDbUser.length == 1) {

        // Jeśli konto nie zostało zweryfikowane
        if (!resultsDbUser[0].email_verified) {
            responseResults = {
                // userId: -1,
                logonError: true,
                logonErrorId: "ACCOUNT_UNCONFIRMED",
                logonErrorDetails: `Your account is not confirmed.`
            }
        }

        // Jeśli konto jest zweryfikowane
        else {
           
            console.log(`${req.body.password}, ${resultsDbUser[0].password}`)
            console.log(checkPassword(req.body.password, resultsDbUser[0].password))

            // Logowanie powiodło się
            if (checkPassword(req.body.password, resultsDbUser[0].password)) {

                // Zaszyfruj dane użytkownika (JWT)
                //var signingKey = secureRandom(256, {type: 'Buffer'})
                var signingKey = process.env.JWT_SECRET
                var claims = {
                    iss: process.env.JWT_ISSUER,   // The URL of your service
                    sub: resultsDbUser[0].id,       // The UID of the user in your system
                    name: resultsDbUser[0].name,
                    email: resultsDbUser[0].email
                } as JSONMap
                var jwt = nJwt.create(claims, signingKey)
                //jwt.setExpiration(new Date().getTime() + (60*60*1000)) // Expiration: 1 hour
                jwt.setExpiration(new Date().getTime() + (60*60*1000*24*7)) // Expiration: 7 days
                jwt.setExpiration(new Date().getTime() + parseInt(process.env.JWT_EXPIRE!))
                // console.log(jwt)
                var token = jwt.compact()
                // console.log(token)

                // Odszyfruj dane użytkownika (JWT)
                try{
                    var verifiedJwt = nJwt.verify(token,signingKey)
                    console.log(verifiedJwt)
                } catch(e){
                    console.log(e)
                }

                responseResults = {
                    logonSuccess: true,
                    sessionToken: token
                }
            }

            // Niepoprawne hasło
            else {
                responseResults = {
                    // userId: -1,
                    logonError: true,
                    logonErrorDetails: `Bad password.`
                }
            }
        }
    }

    else {
        responseResults = {
            // userId: -1,
            logonError: true,
            logonErrorId: "ACCOUNT_NOT_FOUND",
            logonErrorDetails: `User not found`
        }
    }

    //console.log(responseResults)
    res.status(200).json(responseResults);
}
