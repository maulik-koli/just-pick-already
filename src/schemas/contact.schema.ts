import z from "zod";

export const contactFormSchema = z.object({
    name: z.string()
        .min(2, "Name must have atleast 2 character")
        .max(30, "Name can not have more than 30 charcter")
        .optional(),
    email: z.email("Please enter valid email address"),
    message: z.string()
        .min(20, "Please write message with atlest 20 characters")
        .max(1000, "Message can not have more thatn 1000 characters")
})

export type ContactFormType = z.infer<typeof contactFormSchema>

export const defaultContactFormValue: ContactFormType = {
    email: "",
    message: ""
}