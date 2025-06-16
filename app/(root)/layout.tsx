import React from 'react'
import NavBar from '../../components/ui/NavBar'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<main>
			<NavBar />

			{children}
		</main>
	)
}
