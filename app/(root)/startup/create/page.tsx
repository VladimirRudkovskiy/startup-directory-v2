import { auth } from '@/auth'
import StartupForm from '@/components/ui/StartupForm'
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
	const session = await auth();

	if(!session) redirect('/');

	return (
		<>
			<section className='pink-container !min-h-[230px] gradient-stripe'>
				<h1 className='heading'>Submit Your Startup</h1>
			</section>
			<StartupForm />
		</>
	)
}

export default Page
