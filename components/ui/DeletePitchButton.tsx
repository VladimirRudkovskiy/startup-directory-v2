'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from "../../components/ui/button";
import { deletePitch } from "../../lib/actions";

export default function DeletePitchButton({ id }: { id: string }) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleDelete = () => {
		const confirmed = confirm("Are you sure you want to delete this pitch?");
		if (!confirmed) return;

		startTransition(() => {
			deletePitch(id).then((res) => {
				if (res.status === 'SUCCESS') {
					// Redirect to home or profile after deletion
					router.push('/');
				} else {
					alert('Error: ' + res.error);
				}
			});
		});
	};

	return (
		<Button variant="destructive" onClick={handleDelete} disabled={isPending} className='text-red-500'>
			{isPending ? 'Deleting...' : 'Delete Pitch'}
		</Button>
	);
}
