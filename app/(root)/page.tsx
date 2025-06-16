import SearchForm from "../../components/ui/SearchForm";


export default async function Home({ searchParams }: {searchParams: Promise<{query:string}>}) {

	const query = (await searchParams).query;

  return (
		<>
			<section className="pink-container gradient-stripe">
				<h1 className="heading">
					Pitch your Startup, <br /> Connect With your Entrepreneurs
				</h1>

				<p className="font-medium text-[20px] text-white max-w-2xl text-center break-words">
					Sumbit ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
				</p>

				<SearchForm query={query}/>
			</section>
		</>
  );
}
