"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  MultiSelect,
  Checkbox,
  Switch,
  DateSelect,
  Upload,
  SearchInput,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  AreaChart,
  Badge,
  Image,
  Modal,
  Skeleton,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Window,
  Reveal,
  CloseButton,
  ContextMenu,
} from '@smc/darwin-ui';

// Button Preview
const ButtonPreview = () => {
	const [loading, setLoading] = useState(false);

	return (
		<div className="flex flex-wrap gap-2">
			<Button variant="default">Default</Button>
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="success">Success</Button>
			<Button variant="warning">Warning</Button>
			<Button variant="destructive">Destructive</Button>
			<Button
				variant="accent"
				loading={loading}
				onClick={() => {
					setLoading(true);
					setTimeout(() => setLoading(false), 2000);
				}}
			>
				{loading ? "Loading..." : "Click Me"}
			</Button>
		</div>
	);
};

// Input Preview
const InputPreview = () => {
	const [value, setValue] = useState("");
	const [error, setError] = useState(false);

	return (
		<div className="space-y-2 w-full max-w-sm">
			<Input
				placeholder="Type something..."
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<Input
				placeholder="Email address"
				type="email"
				error={error}
				onChange={(e) => setError(!e.target.value.includes("@"))}
			/>
			<Input placeholder="Success state" success />
		</div>
	);
};

// Select Preview
const SelectPreview = () => {
	const [value, setValue] = useState("option1");

	return (
		<div className="w-full max-w-xs">
			<Select
				value={value}
				onChange={(e) => setValue(e.target.value)}
			>
				<option value="option1">Option 1</option>
				<option value="option2">Option 2</option>
				<option value="option3">Option 3</option>
				<option value="option4">Option 4</option>
			</Select>
		</div>
	);
};

// MultiSelect Preview
const MultiSelectPreview = () => {
	const [selected, setSelected] = useState<string[]>(["react"]);

	const options = [
		{ label: "React", value: "react" },
		{ label: "Vue", value: "vue" },
		{ label: "Angular", value: "angular" },
		{ label: "Svelte", value: "svelte" },
		{ label: "Next.js", value: "nextjs" },
	];

	return (
		<div className="w-full max-w-xs">
			<MultiSelect
				value={selected}
				onChange={setSelected}
				options={options}
				placeholder="Select frameworks..."
			/>
		</div>
	);
};

// Checkbox Preview
const CheckboxPreview = () => {
	const [checked1, setChecked1] = useState(false);
	const [checked2, setChecked2] = useState(true);
	const [checked3, setChecked3] = useState(false);

	return (
		<div className="space-y-2">
			<Checkbox
				label="Accept terms and conditions"
				checked={checked1}
				onChange={setChecked1}
			/>
			<Checkbox
				label="Subscribe to newsletter"
				checked={checked2}
				onChange={setChecked2}
			/>
			<Checkbox
				label="Enable notifications"
				checked={checked3}
				onChange={setChecked3}
			/>
		</div>
	);
};

// Switch Preview
const SwitchPreview = () => {
	const [enabled1, setEnabled1] = useState(false);
	const [enabled2, setEnabled2] = useState(true);

	return (
		<div className="space-y-2">
			<Switch
				label="Dark mode"
				checked={enabled1}
				onChange={setEnabled1}
			/>
			<Switch
				label="Auto-save"
				checked={enabled2}
				onChange={setEnabled2}
			/>
		</div>
	);
};

// DateSelect Preview
const DateSelectPreview = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<div className="w-full max-w-md">
			<DateSelect
				value={date}
				onChange={(config) => setDate(config.startDate)}
				label="Select a date"
			/>
		</div>
	);
};

// Upload Preview
const UploadPreview = () => {
	const [files, setFiles] = useState<string[]>([]);

	const handleUpload = async (uploadedFiles: File[]) => {
		// Simulate upload delay
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// Return fake URLs
		return uploadedFiles.map(
			(file) => URL.createObjectURL(file)
		);
	};

	return (
		<div className="w-full max-w-2xl">
			<Upload
				value={files}
				onChange={setFiles}
				onUpload={handleUpload}
				maxFiles={4}
				label="Upload up to 4 images"
			/>
		</div>
	);
};

// SearchInput Preview
const SearchInputPreview = () => {
	const [search, setSearch] = useState("");

	return (
		<div className="w-full max-w-sm">
			<SearchInput
				placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			{search && (
				<p className="text-white/60 text-sm mt-2">
					Searching for: {search}
				</p>
			)}
		</div>
	);
};

// Table Preview
const TablePreview = () => {
	const data = [
		{ id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
		{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
		{ id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
	];

	return (
		<div className="w-full">
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>ID</TableHeaderCell>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Email</TableHeaderCell>
						<TableHeaderCell>Role</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.id}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.email}</TableCell>
							<TableCell>{row.role}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

// Charts Preview
const ChartsPreview = () => {
	const data = [
		{ month: "Jan", sales: 4000, revenue: 2400 },
		{ month: "Feb", sales: 3000, revenue: 1398 },
		{ month: "Mar", sales: 2000, revenue: 9800 },
		{ month: "Apr", sales: 2780, revenue: 3908 },
		{ month: "May", sales: 1890, revenue: 4800 },
		{ month: "Jun", sales: 2390, revenue: 3800 },
	];

	return (
		<div className="w-full">
			<AreaChart
				data={data}
				xKey="month"
				areas={[
					{ dataKey: "sales", fill: "#60a5fa", name: "Sales" },
					{ dataKey: "revenue", fill: "#34d399", name: "Revenue" },
				]}
				height={250}
				showLegend
			/>
		</div>
	);
};

// Badge Preview
const BadgePreview = () => {
	return (
		<div className="flex flex-wrap gap-2">
			<Badge variant="default">Default</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="destructive">Error</Badge>
			<Badge variant="info">Info</Badge>
			<Badge variant="published">Published</Badge>
			<Badge variant="draft">Draft</Badge>
			<Badge variant="new">New</Badge>
		</div>
	);
};

// Image Preview
const ImagePreview = () => {
	return (
		<div className="w-full max-w-sm">
			<Image
				src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop"
				alt="Sample image"
				className="w-full h-48 object-cover"
				clickToEnlarge
			/>
			<p className="text-white/60 text-xs mt-2 text-center">
				Click to enlarge
			</p>
		</div>
	);
};

// Modal Preview
const ModalPreview = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Example Modal"
			>
				<div className="space-y-4">
					<p className="text-white/80">
						This is a fully functional modal dialog. You can close it by
						clicking the close button, pressing ESC, or clicking outside.
					</p>
					<div className="flex gap-2">
						<Button
							variant="primary"
							onClick={() => setIsOpen(false)}
						>
							Confirm
						</Button>
						<Button
							variant="secondary"
							onClick={() => setIsOpen(false)}
						>
							Cancel
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

// Toast Preview - Simple demo without provider
const ToastPreview = () => {
	const [toasts, setToasts] = useState<Array<{ id: string; message: string }>>([]);

	const showToast = () => {
		const id = Math.random().toString(36);
		setToasts((prev) => [...prev, { id, message: "Task completed successfully!" }]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 3000);
	};

	return (
		<div>
			<Button onClick={showToast}>Show Toast</Button>
			<div className="fixed top-4 right-4 flex flex-col gap-2 pointer-events-none z-50">
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className="bg-[rgba(30,30,31,0.95)] backdrop-blur-xl shadow-lg rounded-md min-w-80 max-w-md pointer-events-auto animate-in slide-in-from-right duration-300"
					>
						<div className="p-4 flex items-start gap-3">
							<div className="flex-1 min-w-0">
								<div className="text-white/90 text-sm font-semibold">
									Success
								</div>
								<div className="text-white/70 text-sm">{toast.message}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

// Alert Preview - Simple demo without provider
const AlertPreview = () => {
	return (
		<div className="w-full max-w-md space-y-3">
			<div className="bg-blue-500/20 border border-blue-500/30 rounded-md p-4">
				<div className="flex items-start gap-3">
					<div className="text-blue-400">ℹ</div>
					<div className="flex-1">
						<h3 className="text-white/90 text-sm font-semibold">
							Information
						</h3>
						<p className="text-white/60 text-sm mt-1">
							This is an informational alert message.
						</p>
					</div>
				</div>
			</div>
			<div className="bg-green-500/20 border border-green-500/30 rounded-md p-4">
				<div className="flex items-start gap-3">
					<div className="text-green-400">✓</div>
					<div className="flex-1">
						<h3 className="text-white/90 text-sm font-semibold">
							Success
						</h3>
						<p className="text-white/60 text-sm mt-1">
							Operation completed successfully!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

// Skeleton Preview
const SkeletonPreview = () => {
	return (
		<div className="w-full max-w-md space-y-3">
			<Skeleton className="h-12 w-full" />
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-4 w-1/2" />
			<div className="flex gap-2">
				<Skeleton className="h-20 w-20 rounded-full" />
				<div className="flex-1 space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
				</div>
			</div>
		</div>
	);
};

// Card Preview
const CardPreview = () => {
	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>
					This is a card component with header and content.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-white/80 text-sm">
					Cards are great for organizing content into distinct sections.
					They support headers, footers, and custom content.
				</p>
			</CardContent>
		</Card>
	);
};

// Window Preview
const WindowPreview = () => {
	return (
		<div className="w-full max-w-2xl h-64">
			<Window title="Application Window">
				<div className="p-6">
					<h3 className="text-white/90 text-lg font-semibold mb-2">
						macOS-style Window
					</h3>
					<p className="text-white/70 text-sm">
						This is a macOS-style window component with a title bar
						and close button. Perfect for creating desktop-like interfaces.
					</p>
				</div>
			</Window>
		</div>
	);
};

// Reveal Preview
const RevealPreview = () => {
	const [key, setKey] = useState(0);

	return (
		<div className="w-full max-w-md space-y-4">
			<Button onClick={() => setKey((k) => k + 1)}>
				Reset Animation
			</Button>
			<Reveal key={key} type="fade" duration={0.8}>
				<div className="bg-white/5 border border-white/10 rounded-lg p-6">
					<h3 className="text-white/90 font-semibold mb-2">Fade In</h3>
					<p className="text-white/70 text-sm">
						This element fades in smoothly when it enters the viewport.
					</p>
				</div>
			</Reveal>
			<Reveal key={key + 1} type="slide" direction="up" duration={0.8} delay={0.2}>
				<div className="bg-white/5 border border-white/10 rounded-lg p-6">
					<h3 className="text-white/90 font-semibold mb-2">Slide Up</h3>
					<p className="text-white/70 text-sm">
						This element slides up when it appears.
					</p>
				</div>
			</Reveal>
		</div>
	);
};

// CloseButton Preview
const CloseButtonPreview = () => {
	const [visible, setVisible] = useState(true);

	return (
		<div className="space-y-4">
			{visible ? (
				<div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-start justify-between">
					<div>
						<h4 className="text-white/90 font-medium">Notification</h4>
						<p className="text-white/60 text-sm">
							Click the close button to dismiss this message.
						</p>
					</div>
					<CloseButton
						onClick={() => setVisible(false)}
					/>
				</div>
			) : (
				<Button onClick={() => setVisible(true)}>Show Again</Button>
			)}
		</div>
	);
};

// ContextMenu Preview
const ContextMenuPreview = () => {
	const [action, setAction] = useState("Right-click me!");

	const menuItems = [
		{
			label: "Copy",
			onClick: () => setAction("Copied!"),
			shortcut: "⌘C",
		},
		{
			label: "Paste",
			onClick: () => setAction("Pasted!"),
			shortcut: "⌘V",
		},
		{
			label: "Delete",
			onClick: () => setAction("Deleted!"),
			shortcut: "⌫",
		},
		{
			label: "Disabled Item",
			onClick: () => {},
			disabled: true,
		},
	];

	return (
		<div className="w-full max-w-md">
			<ContextMenu items={menuItems} trigger="contextmenu">
				<div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
					<p className="text-white/90 font-medium mb-2">{action}</p>
					<p className="text-white/60 text-sm">
						Right-click here to open the context menu
					</p>
				</div>
			</ContextMenu>
		</div>
	);
};

// Export all previews
export const componentPreviews: Record<string, React.ReactNode> = {
	Button: <ButtonPreview />,
	Input: <InputPreview />,
	Select: <SelectPreview />,
	MultiSelect: <MultiSelectPreview />,
	Checkbox: <CheckboxPreview />,
	Switch: <SwitchPreview />,
	DateSelect: <DateSelectPreview />,
	Upload: <UploadPreview />,
	SearchInput: <SearchInputPreview />,
	Table: <TablePreview />,
	Charts: <ChartsPreview />,
	Badge: <BadgePreview />,
	Image: <ImagePreview />,
	Modal: <ModalPreview />,
	Toast: <ToastPreview />,
	Alert: <AlertPreview />,
	Skeleton: <SkeletonPreview />,
	Card: <CardPreview />,
	Window: <WindowPreview />,
	Reveal: <RevealPreview />,
	CloseButton: <CloseButtonPreview />,
	ContextMenu: <ContextMenuPreview />,
};
