import StartupCard, { StartupTypeCard } from "@/components/ui/StartupCard";
import SearchForm from "../../components/ui/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


export default async function Home({ 
	searchParams,
 }: {
	searchParams: Promise<{query:string}>
}) {

	const query = (await searchParams).query;
	const params = { search: query || null };

	const session = await auth();
	console.log(session?.id)

	const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });


  return (
		<>
			<section className="video-container relative flex items-center justify-center text-center overflow-hidden">
				 <video
					autoPlay
					preload="auto"
					loop
					muted
					playsInline
					poster="/preview.png"
					className="absolute top-0 left-0 w-full h-full object-cover z-0"
				>
					<source src="/Footage.mp4" type="video/mp4" />
				</video>
				<div className="relative z-10 text-white px-6 max-w-3xl ">
				<h1 className="heading rounded-3xl">
					Pitch your Startup <br /> Connect With your Entrepreneurs
				</h1>
				<p className="font-medium text-[20px] text-white max-w-3xl text-center break-words drop-shadow-[0_0_1px_black]">
					Sumbit ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
				</p>
				<SearchForm query={query}/>

				</div>
			</section>

			<div className="gray-background">
			<section className="section-container">
				<p className="text-30-semibold">
					{query ? `Search results for '${query}'`: 'All Startups'}
				</p>

				<ul className="mt-7 card-grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
			</section>

			</div>

			<SanityLive />
		</>
  );
}
