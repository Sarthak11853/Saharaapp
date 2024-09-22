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
            Phone:9521688016,
            Otp:otp,
            OtpExpire:new Date(Date.now()+300000)
        })
        
        const phoneNumber = `+919521688016`;
        console.log(location)
        let helpMessage=`Some One in your area need your Sahaara https://www.google.com/maps?q=${location.latitude},${location.longitude}`
            
        const message = await client.messages.create({
            body: helpMessage,
            from: "+13343452295",
            to: phoneNumber,
        });
        // console.log("OTP:",otp);
        console.log("Help sent successfully", message.sid);
        await Otp.deleteOne({Phone:9521688016});


        // await Database();
        // await Otp.create({
        //     Name:"roshan",
        //     Phone:7850823847,
        //     Otp:otp,
        //     OtpExpire:new Date(Date.now()+300000)
        // })
        
        // const phoneNumber2 = `+917850823847`;
        // console.log(location)
        // let helpMessage2=`Some One in your area need your Sahaara https://www.google.com/maps?q=${location.latitude},${location.longitude}`
            
        // const message2 = await client.messages.create({
        //     body: helpMessage2,
        //     from: "+",
        //     to: phoneNumber2,
        // });
        // // console.log("OTP:",otp);
        // console.log("Help sent successfully", message2.sid);
        // await Otp.deleteOne({Phone:9521688016});


        return NextResponse.json({ status: 200, message: "Help sent successfully" })
        
    } catch (error) {
        console.error("Help fetch error:", error);
        return NextResponse.json({ status: 500, message: "Help fetch error" })

        
    }

    
    
}