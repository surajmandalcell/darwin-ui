"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Terminal, Code2, Wand2 } from "lucide-react";

const codeLines = [
	"// Claude, add a date picker to the form",
	'import { DateSelect } from "@pikoloo/darwin-ui";',
	"",
	"<DateSelect",
	"  value={selectedDate}",
	"  onChange={setSelectedDate}",
	'  placeholder="Choose date"',
	"/>",
];

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
	return (
		<motion.div
			className="flex items-start gap-4 p-4 rounded-xl bg-muted/20 border border-border/60 hover:bg-muted/40 hover:border-border transition-all duration-300"
			initial={{ opacity: 0, x: 20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay }}
		>
			<div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
				{icon}
			</div>
			<div>
				<h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
				<p className="text-xs text-muted-foreground leading-relaxed">
					{description}
				</p>
			</div>
		</motion.div>
	);
}

export function AgenticCodingSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const codeRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(codeRef, { once: true, margin: "-100px" });

	const [displayedLines, setDisplayedLines] = useState<string[]>([]);
	const [currentLineIndex, setCurrentLineIndex] = useState(0);
	const [currentCharIndex, setCurrentCharIndex] = useState(0);
	const [isTyping, setIsTyping] = useState(false);
	const [cursorVisible, setCursorVisible] = useState(true);

	// Blinking cursor effect
	useEffect(() => {
		const cursorInterval = setInterval(() => {
			setCursorVisible((prev) => !prev);
		}, 530);
		return () => clearInterval(cursorInterval);
	}, []);

	// Typing animation
	useEffect(() => {
		if (!isInView || currentLineIndex >= codeLines.length) return;

		setIsTyping(true);
		const currentLine = codeLines[currentLineIndex];

		if (currentCharIndex < currentLine.length) {
			// Type next character with slight randomization (30-50ms)
			const delay = Math.random() * 20 + 30;
			const timeout = setTimeout(() => {
				setDisplayedLines((prev) => {
					const newLines = [...prev];
					if (newLines.length <= currentLineIndex) {
						newLines.push(currentLine.substring(0, currentCharIndex + 1));
					} else {
						newLines[currentLineIndex] = currentLine.substring(
							0,
							currentCharIndex + 1,
						);
					}
					return newLines;
				});
				setCurrentCharIndex((prev) => prev + 1);
			}, delay);
			return () => clearTimeout(timeout);
		} else {
			// Line complete, pause then move to next line
			const timeout = setTimeout(() => {
				setCurrentLineIndex((prev) => prev + 1);
				setCurrentCharIndex(0);
				if (currentLineIndex + 1 >= codeLines.length) {
					setIsTyping(false);
				}
			}, 200);
			return () => clearTimeout(timeout);
		}
	}, [isInView, currentLineIndex, currentCharIndex]);

	// Determine if a line is a comment
	const isComment = (line: string) => line.trim().startsWith("//");

	return (
		<section
			ref={sectionRef}
			className="pt-24 md:pt-32 lg:pt-40 pb-32 max-sm:pb-20 lg:pb-48 px-4 md:px-6 lg:px-8 relative overflow-hidden"
		>
			{/* Emerald glow effect */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="w-200 h-150 bg-emerald-500/8 blur-[120px] rounded-full" />
			</div>
			<div className="absolute top-1/4 right-1/4 w-100 h-100 bg-emerald-400/5 blur-[100px] rounded-full" />

			<div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20 relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
					{/* Left side - Code editor */}
					<motion.div
						ref={codeRef}
						className="order-2 lg:order-1"
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					>
						<div className="rounded-xl border border-border overflow-hidden bg-card shadow-2xl shadow-foreground/20">
							{/* Window chrome */}
							<div className="flex items-center gap-2 px-4 py-3 bg-muted/20 border-b border-border/60">
								<div className="flex items-center gap-1.5">
									<div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
									<div className="w-3 h-3 rounded-full bg-[#febc2e]" />
									<div className="w-3 h-3 rounded-full bg-[#28c840]" />
								</div>
								<span className="ml-4 text-xs text-muted-foreground font-medium">
									FormComponent.tsx
								</span>
							</div>

							{/* Code content */}
							<div className="p-4 font-mono text-sm min-h-70">
								{displayedLines.map((line, index) => (
									<div key={`code-line-${index}-${line.slice(0, 20)}`} className="flex">
										{/* Line number */}
										<span className="w-8 text-right pr-4 text-muted-foreground/50 select-none text-xs leading-6">
											{index + 1}
										</span>
										{/* Code line */}
										<span
											className={`leading-6 ${
												isComment(codeLines[index])
													? "text-muted-foreground/70 italic"
													: "text-emerald-400/90"
											}`}
										>
											{line}
											{/* Cursor at end of current line being typed */}
											{index === currentLineIndex &&
												isTyping &&
												cursorVisible && (
													<span className="inline-block w-0.5 h-4 bg-emerald-400 ml-px align-middle" />
												)}
										</span>
									</div>
								))}
								{/* Cursor on empty new line if between lines */}
								{!isTyping &&
									currentLineIndex >= codeLines.length &&
									cursorVisible && (
										<div className="flex">
											<span className="w-8 text-right pr-4 text-muted-foreground/50 select-none text-xs leading-6">
												{displayedLines.length + 1}
											</span>
											<span className="inline-block w-0.5 h-4 bg-emerald-400 align-middle" />
										</div>
									)}
								{/* Placeholder lines for consistent height */}
								{displayedLines.length < 8 &&
									Array.from({ length: 8 - displayedLines.length }, (_, i) => (
										<div key={`placeholder-line-${displayedLines.length + i + 1}`} className="flex">
											<span className="w-8 text-right pr-4 text-muted-foreground/30 select-none text-xs leading-6">
												{displayedLines.length + i + 1}
											</span>
										</div>
									))}
							</div>
						</div>
					</motion.div>

					{/* Right side - Content */}
					<div className="order-1 lg:order-2 space-y-8">
						{/* Title */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							<h2 className="text-4xl md:text-5xl font-bold leading-tight font-heading">
								<span className="text-foreground">Agentic Coding</span>
								<br />
								<span className="text-muted-foreground">
									Supported by Default
								</span>
							</h2>
						</motion.div>

						{/* Feature cards */}
						<div className="space-y-3 pt-4">
							<FeatureCard
								icon={<Terminal className="w-5 h-5 text-emerald-400" />}
								title="Claude Code Compatible"
								description="Works seamlessly with Claude, Cursor, and AI coding assistants."
								delay={0.3}
							/>
							<FeatureCard
								icon={<Code2 className="w-5 h-5 text-emerald-400" />}
								title="Clean API Surface"
								description="Predictable props and patterns that AI can understand and generate."
								delay={0.4}
							/>
							<FeatureCard
								icon={<Wand2 className="w-5 h-5 text-emerald-400" />}
								title="Self-Documenting"
								description="TypeScript types and JSDoc comments guide AI suggestions."
								delay={0.5}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
