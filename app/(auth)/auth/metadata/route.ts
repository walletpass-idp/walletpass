import { NextResponse } from 'next/server'


export async function GET(request: Request) {





    console.log('/metadata');
    return NextResponse.json({
        "privacy_policy_url": "https://walletpass.login.codes/privacy_policy.html",
        "terms_of_service_url": "https://walletpass.login.codes/terms_of_service.html"
    }, { status: 200 })

}