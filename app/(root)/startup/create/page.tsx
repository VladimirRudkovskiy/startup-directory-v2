import { auth } from "../../../../auth"
import StartupForm from "../../../../components/ui/StartupForm"
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
	const session = await auth();

	if(!session) redirect('/');

	return (
		<>
		<div className='gray-background'>
			
			<section className='pink-container !min-h-[230px] rounded-4xl border-5 border-black '>
				<h1 className='heading rounded-3xl'>Submit Your Startup</h1>
			</section>
			<StartupForm />
		</div>
		</>
	)
}

export default Page
