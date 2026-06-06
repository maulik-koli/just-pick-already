import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/server/resend";
import { contactFormSchema, ContactFormType } from "@/schemas/contact.schema";

import { apiWrapper } from "../../../lib/_error";
import { SendEmailResponse } from "@/types/_types";


export const POST = apiWrapper(async (request: NextRequest) => {
    const body = await request.json();
    contactFormSchema.parse(body)

    const payload: ContactFormType = body

    await sendEmail(payload)

    const resData: SendEmailResponse = {
        code: "OK",
        message: "Successfully send mail",
        success: true,
        data: null
    }

    return NextResponse.json(resData, { status: 200 });
})