import { formatDate } from "../../../../lib/utils";
import { client } from "../../../../sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "../../../../sanity/lib/queries";
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import { Skeleton } from "../../../../components/ui/skeleton";
import View from "../../../../components/ui/View";
import DeletePitchButton from "../../../../components/ui/DeletePitchButton";
import { auth } from "@/auth";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: {params: Promise<{id: string}>}) => {
	const id = (await params).id;

	const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

	if(!post) return notFound();

	const parsedContent = md.render(post?.pitch || '');
	const currentUser = await auth();
	const isAuthor = currentUser?.id === post.author?._id;


	return (
		<>
			<section className='pink-container rounded-4xl  gradient-stripe !min-h-[230px]'>
				
				<p className='tag'>
					{formatDate(post?._createdAt)}
				</p>
				<h1 className='heading rounded-3xl'>{post.title}</h1>
				<p className='sub-heading  !max-w-5xl'>{post.description}</p>
			</section>

			<section className='section-container'>
				<img src={post.image} alt="thumbnail" className='w-full h-auto rounded-xl'/>

				<div className='space-y-5 mt-10 mx-auto'>
					<div className='flex-between gap-5 section-container'>
						<Link
							href={`/user/${post.author?._id}`}
							className='flex gap-2 items-center mb-3'>
							<Image src={post.author.image} alt='avatar' width={64} height={64} className='rounded-full drop-shadow'/>

							<div>
								<p className='text-20-medium'>{post.author.name}</p>
								<p className='text-16-medium !text-black-300'>
									@{post.author.username}
									</p>
							</div>
							
						</Link>
						<p className='category-tag'>{post.category}</p>
					</div>

					<h3 className='text-30-bold'>Startup Details</h3>
					{parsedContent ? (
						<article
						className='prose font-work-sans break-all'
						dangerouslySetInnerHTML={{ __html: parsedContent }}
						/>
					) : (
						<p className='no-result'>No Details Provided</p>
					)}
				</div>

				<hr className='devider'/>
				{isAuthor && <DeletePitchButton id={post._id} />}
			</section>

			<Suspense fallback={<Skeleton className='view-skeleton'/>}>
				<View id={id}/>
			</Suspense>
		</>
	)
}

export default Page
