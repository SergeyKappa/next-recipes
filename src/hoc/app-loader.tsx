'use client'
import { useAuthStore } from '@/store/auth.store'
import { useIngredientStore } from '@/store/inrgedient.store'
import { useRecipeStore } from '@/store/recipe.stote'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

interface IProps {
	children: React.ReactNode
}

const AppLoader = ({ children }: IProps) => {
	const { data: session, status } = useSession()
	const { loadIngredients } = useIngredientStore()
	const { isAuth, setAuthState } = useAuthStore()
	const { loadRecipes } = useRecipeStore()

	useEffect(() => {
		setAuthState(status, session)
	}, [status, session, setAuthState])

	useEffect(() => {
		if (isAuth) {
			loadIngredients()
		}
	}, [isAuth, loadIngredients])

	useEffect(() => {
		loadRecipes()
	}, [loadRecipes])

	return <>{children}</>
}

export default AppLoader
