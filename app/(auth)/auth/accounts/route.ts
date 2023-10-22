/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server'
import  { getUser, getUserById, addUser, updateCredentials, resetUsers } from '@/lib/db'


export async function GET(request: Request) {


console.log('/account', user);
return NextResponse.json({
    accounts: [{
      id: user.id,
      given_name: user.given_name,
      name: `${user.given_name} ${user.family_name}`,
      email: user.username,
      picture: user.picture,
      approved_clients: user.approved_clients
     }]
   }, { status: 200 })

}
