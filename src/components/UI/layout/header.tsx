'use client'

import { siteConfig } from '@/config/site.config'
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { layoutConfig } from '@/config/layout.config'
import RegistrationModal from '../modals/registration.modal'
import {LoginModal }from '../modals/login.modal '
import { useState } from 'react'
import { signOutFunc } from '@/actions/sign-out'
import { useAuthStore } from '@/store/auth.store'

export const Logo = () => {
	return (
		<Image
			alt={siteConfig.title}
			src='/pizz.jpeg'
			height={26}
			width={26}
			priority
			className='rounded-full h-auto w-full'
		/>
	)
}

export default function Header() {
	const pathname = usePathname()

	const {isAuth, session, status, setAuthState} = useAuthStore()


	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
	const [isLoginOpen, setIsLoginOpen] = useState(false)

	const handleSignOut = async () => {
	
		try {
				await signOutFunc()
		} catch (error) {
			console.log('error', error);
			
		}
		setAuthState('unauthenticated', null)
	}

 const getNavItems = () => {
    return siteConfig.navItems
      .filter((item) => {
        if (item.href === "/ingredients") {
          return isAuth;
        }
        return true;
      })
      .map((item) => {
        const isActive = pathname === item.href;

			return (
				<NavbarItem key={item.href}>
					<Link
						color='foreground'
						href={item.href}
						className={`px-2 py-1 rounded-md ${
							isActive ? 'text-primary font-semibold ' : ''
						}hover:border hover:border-blue-300 transition-colors transition-all duration-200`}
					>
						{item.label}
					</Link>
				</NavbarItem>
			)
		})
	}

	return (
		<Navbar style={{ height: layoutConfig.headerHeight }}>
			<NavbarBrand>
				<Link href='/' className='flex gap-2'>
					<Logo />
					<p className='font-bold text-inherit'>{siteConfig.title}</p>
				</Link>
			</NavbarBrand>
			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				{getNavItems()}
			</NavbarContent>
			<NavbarContent justify='end'>
			  {isAuth && <NavbarItem>Привіт, {session?.user?.email}!</NavbarItem>}


		{status === "loading" ? (
          <NavbarItem>Завантаження...</NavbarItem>
        ) : !isAuth ? (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="secondary"
                href="#"
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                Логін
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Реєстрація
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color="secondary"
              href="#"
              variant="flat"
              onPress={handleSignOut}
            >
              Вийти
            </Button>
          </NavbarItem>
        )}
			
	
				
			</NavbarContent>
			<RegistrationModal
				isOpen={isRegistrationOpen}
				onClose={() => setIsRegistrationOpen(false)}
			/>
			<LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
		</Navbar>
	)
}
