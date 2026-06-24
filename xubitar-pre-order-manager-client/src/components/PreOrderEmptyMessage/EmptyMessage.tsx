
import * as React from "react"
import Link from "next/link"
import { Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmptyMessage() {
	return (
		<div className="flex flex-col items-center justify-center py-12 gap-4">
			<Inbox className="size-12 text-[#9aa0a6]" />
			<h3 className="text-lg font-verdana font-bold text-text-primary">No preorders found</h3>
			<p className="text-sm text-[#6b6f73] max-w-md text-center">
				You don&apos;t have any preorders yet. Create your first preorder to
				start collecting orders.
			</p>

			<Button asChild>
				<Link href="/create-preorder">Create Preorder</Link>
			</Button>
		</div>
	)
}

export { EmptyMessage }

