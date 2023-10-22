import { NextResponse } from 'next/server'
import  { getUser, getUserById, addUser, updateCredentials, resetUsers } from '@/lib/db'
const jwt = require('jsonwebtoken');


export async function POST(request: Request) {
    const { client_id, nonce, account_id, consent_acquired, disclosure_text_shown } = await request.json()
     const user = getUser("bob")
    const token = jwt.sign({
        iss: process.env.ORIGIN,
        sub: user.id,
        aud: client_id,
        nonce,
        exp: new Date().getTime()+IDTOKEN_LIFETIME,
        iat: new Date().getTime(),
        name: `${user.given_name} ${user.family_name}`,
        email: user.username,
        given_name: user.given_name,
        family_name: user.family_name,
        picture: user.picture
      }, 'xxxxx');

//account_id=123&client_id=client1234&nonce=Ct60bD&consent_acquired=true


console.log('/account', message);
return NextResponse.json({ user: message }, { status: 200 })

}