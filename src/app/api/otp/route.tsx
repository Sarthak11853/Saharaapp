import { Database } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import Otp from "@/Schema/otp.Schema"

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(req:NextRequest,res:NextResponse) {
    const {location} = await req.json();
    try {
        var otp = Math.floor(100000 + Math.random()*900000);
        
        await Database();
        await Otp.create({
            Name:"name",
            Phone:7850823847,
            Otp:otp,
            OtpExpire:new Date(Date.now()+300000)
        })
        
        const phoneNumber = `+917850823847`;
        console.log(location)
        let helpMessage=`Some One in your area need your Sahaara https://www.google.com/maps?q=${location.latitude},${location.longitude}`
            
        const message = await client.messages.create({
            body: helpMessage,
            from: "+18576889679",
            to: phoneNumber,
        });
        // console.log("OTP:",otp);
        console.log("Help sent successfully", message.sid);
        await Otp.deleteOne({Phone:7850823847});
        return NextResponse.json({ status: 200, message: "Help sent successfully" })
        
    } catch (error) {
        console.error("Help fetch error:", error);
        return NextResponse.json({ status: 500, message: "Help fetch error" })

        
    }

    
    
}