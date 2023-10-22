import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

export function EndDialog({
	gameOver,
	score,
	bestScore,
}: {
	gameOver: boolean
	score: number
	bestScore: number
}) {
	return (
		<div className="flex items-center justify-center mt-4">
			{gameOver && (
				<Dialog>
					<DialogTrigger asChild>
						<Button>Stats</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Game over</DialogTitle>
							<DialogDescription>
								Your score: {score}, Best score: {bestScore}
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button
								onClick={() => {
									window.length, location.reload()
								}}
							>
								Restart
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	)
}
