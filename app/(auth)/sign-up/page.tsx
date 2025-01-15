'use client';
import AuthForm from '@/components/AuthForm'
import { signUp } from '@/lib/actions/auth';
import { signUpSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <AuthForm
        type='SIGN_UP'
        schema={signUpSchema}
        defaultValues={{
            email:"",
            password:"",
            fullName:'',
            universityId:0,
            universityCard:'',
        }}
        onSumbit={signUp}
    />
  )
}

export default page