'use client'

import React, { useState } from 'react'
import { Form, Input, Button } from '@heroui/react'
import { registerUser } from '@/actions/register'
import { log } from 'console'


interface IProps {
	onClose: () => void
}

const RegistrationForm = ({onClose}: IProps) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	})

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Form submitted', formData)

const result = await registerUser(formData)
   
    console.log('result', result);
    
		onClose()
	}
	return (
		<Form className='w-full max-w-xs' onSubmit={onSubmit}>
			<Input
				isRequired
				aria-label='Email'
				name='email'
				placeholder='Введите email'
				type='email'
				value={formData.email}
				onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				validate={(value) => {
					if (!value) {
						return 'Почта обязательна'
					}
					if (!validateEmail(value)) {
						return 'Некорректный email address'
					}
					return null
				}}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none'
        }}
			/>
			 <Input
        isRequired
        name="password"
        placeholder="Введите пароль"
        type="password"
        value={formData.password}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none "
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return "Пароль обязателен";
          if (value.length < 6) return "Пароль должен быть не менее 6 символов";
          return null;
        }}
      />
        <Input
        isRequired
        name="confirmPassword"
        placeholder="Подтвердите пароль"
        type="password"
        value={formData.confirmPassword}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none "
        }}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        validate={(value) => {
          if (!value) return "Пароль для подтверждения обязателен";
          if (value !== formData.password) return "Пароли не совпадают";
          return null;
        }}
      />
      <div className="flex w-[100%]  gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose}>
          Отмена
        </Button>
        <Button color="primary" type="submit">
          Зарегистрироваться
        </Button>
      </div>
		</Form>
	)
}

export default RegistrationForm
