'use client';
import AuthFormAdmin from '@/components/AuthFormAdmin';
import {  signInWithCredentialsadmin } from '@/lib/actions/auth';
import { signInSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <AuthFormAdmin
        type='SIGN_IN'
        schema={signInSchema}
        defaultValues={{
            email:"",
            password:"",
        }}
        onSumbit={signInWithCredentialsadmin}
    />
  )
}

export default page