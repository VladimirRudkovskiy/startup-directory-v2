import { auth, signIn, signOut } from "../../auth"
import { BadgePlusIcon, Icon, LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

const NavBar = async () => {

	const session = await auth();
	return (
		<header className='px-5 py-3 bg-white shadow:sm font-work-sans gray-background'>
			<nav className='flex justify-between items-center text-black'>
				<Link href='/'>
					<Image src='/logo.png' alt='logo' width={144} height={30}/>
				</Link>

				<div className='flex items-center gap-5'>
					{session && session?.user ? (
						<>
							<Link href='/startup/create'>
								<span className='max-sm:hidden'>Create</span>
								<BadgePlusIcon className='size-6 sm:hidden'/>
							</Link>

							<form action={async () => {
								'use server'
								await signOut({redirectTo: '/'})
							}}>
								<button type="submit">
									<span className='max-sm:hidden'>Log Out</span>
									<LogOutIcon className='size-6 sm:hidden text-red-500'/>
								</button>
							</form>

							<Link href={`/user/${session?.id}`}>
								<Avatar className='size-10'>
									<AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''}/>
									<AvatarFallback>
										AV
									</AvatarFallback>
								</Avatar>
							</Link>
						</>
					) : (
						<form action ={async () => {
								"use server";
								await signIn('github')
							}}>
							<button type='submit'>
								Log In
							</button>
						</form>
					)}
				</div>
			</nav>
		</header>
	)
}

export default NavBar

