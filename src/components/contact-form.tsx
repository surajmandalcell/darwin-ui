"use client";

import Reveal from "./reveal";
import { manrope } from "../lib/fonts";
import { useContactForm } from "../hooks/use-contact-form";

interface CompactContactFormProps {
	title?: string;
	className?: string;
}

export function CompactContactForm({
	title = "Quick Connect Form",
	className = "",
}: CompactContactFormProps) {
	const {
		formData,
		isSubmitting,
		submitStatus,
		handleInputChange,
		handleSubmit,
	} = useContactForm({
		initialValues: {
			name: "",
			email: "",
		},
		defaultMessage: "Contact request (compact form)",
	});

	return (
		<section className={`relative py-14 sm:py-16 ${className}`}>
			<div className="relative z-10 mx-auto max-w-6xl px-4">
				<div className="relative overflow-hidden bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-[var(--radius-xl,1rem)]">
					<div className="absolute inset-0 bg-black/5 dark:bg-white/5" />
					<div className="relative z-10 p-5 sm:p-6">
						{/* Row 1: Heading */}
						<div className="text-left mb-4">
							<Reveal className="sm:flex gap-2">
								<h3
									className={`${manrope.className} text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100 font-light `}
								>
									{title}
								</h3>
								<p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
									Will reach out asap, thats a promise!
								</p>
							</Reveal>
							{/* Subtitle intentionally omitted for compact variant */}
						</div>
						{/* Row 2: Inputs + Submit */}
						<Reveal delay={0.1}>
							<form
								onSubmit={handleSubmit}
								className="flex flex-col gap-3 sm:flex-row sm:items-center"
							>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									required
									className="flex-1 py-3 px-4 bg-black/5 dark:bg-white/5 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[var(--radius-md,0.5rem)] text-zinc-900 dark:text-zinc-100 text-sm transition-all duration-200 placeholder:text-zinc-600 dark:placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-blue-500 hover:ring-black/20 dark:hover:ring-white/20"
									placeholder="Your Name"
								/>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									className="flex-1 py-3 px-4 bg-black/5 dark:bg-white/5 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[var(--radius-md,0.5rem)] text-zinc-900 dark:text-zinc-100 text-sm transition-all duration-200 placeholder:text-zinc-600 dark:placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-blue-500 hover:ring-black/20 dark:hover:ring-white/20"
									placeholder="your@email.com"
								/>
								<button
									type="submit"
									disabled={isSubmitting}
									className={`${manrope.className} w-full sm:w-auto px-6 py-3 min-h-11 ${isSubmitting ? "bg-black/5 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 cursor-not-allowed" : "bg-black/10 dark:bg-white/10 hover:bg-black/15 dark:hover:bg-white/15 text-zinc-900 dark:text-zinc-100"} border border-black/20 dark:border-white/20 rounded-[var(--radius-md,0.5rem)] transition-colors font-medium text-sm`}
								>
									{isSubmitting ? "Submitting..." : "Submit"}
								</button>
							</form>
							{submitStatus !== "idle" && (
								<div className="mt-3 text-left">
									{submitStatus === "success" ? (
										<p
											className={`${manrope.className} text-sm text-emerald-500`}
										>
											Thank you! Your message has been sent.
										</p>
									) : (
										<p className={`${manrope.className} text-sm text-red-500`}>
											Sorry, there was an error. Try again or email
											connect@lunatecz.com
										</p>
									)}
								</div>
							)}
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
