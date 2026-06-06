'use client'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormType, defaultContactFormValue } from '@/schemas/contact.schema';
import { useSendEmail } from '@/hooks/api/mutation';
import { useToast } from '@/hooks/use-toast';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShinyButton } from '@/components/ui/shiny-button';


const ContactForm: React.FC = () => {
    const form = useForm<ContactFormType>({
        defaultValues: defaultContactFormValue,
        resolver: zodResolver(contactFormSchema)
    })
    const { control, handleSubmit } = form

    const { mutate, isPending } = useSendEmail()
    const toast = useToast()

    const onSubmit = (data: ContactFormType) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Message sent successfully")
                form.reset()
            },
            onError: () => {
                toast.error("Failed to send message")
            }
        })
    };


    return (
        <div className="bg-card/80 backdrop-blur-md border-2 border-border rounded-3xl p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <Controller
                    name='name'
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            placeholder="Enter your name"
                            label='Name (Optional)'
                            value={field.value || ''}
                            onChange={field.onChange}
                            disabled={isPending}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name='email'
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label='Email *'
                            type="email"
                            placeholder="Enter your email"
                            value={field.value}
                            onChange={field.onChange}
                            disabled={isPending}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name='message'
                    control={control}
                    render={({ field, fieldState }) => (
                        <Textarea
                            label="Message *"
                            placeholder="Enter your message"
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                            disabled={isPending}
                        />
                    )}
                />

                <div className="mt-2">
                    <ShinyButton
                        variant="default"
                        hideShiny={true}
                        className="w-full rounded-xl py-4 h-auto text-base font-bold shadow-md"
                        disabled={isPending}
                        type='submit'
                    >
                        {isPending ? "SENDING..." : "SEND MESSAGE"}
                    </ShinyButton>
                </div>
            </form>
        </div>
    )
}

export default ContactForm