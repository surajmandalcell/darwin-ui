"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import { Calendar, ChevronDown } from "lucide-react";

type EventType = "single" | "recurring";
type FrequencyType =
	| "daily"
	| "weekly"
	| "monthly"
	| "weekends"
	| "specific-day";
type DateMode = "datetime" | "date-only" | "month-only" | "year-only";
type TimeMode = "specific-time" | "all-day" | "none";
type DayOfWeek =
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday"
	| "Saturday"
	| "Sunday";

export interface DateConfig {
	eventType: EventType;
	startDate?: Date;
	endDate?: Date;
	time?: string; // For single events
	dateMode: DateMode;
	timeMode?: TimeMode; // For single events
	frequency?: FrequencyType;
	dayOfWeek?: DayOfWeek;
	// For recurring events - separate start and end times
	startTime?: string;
	endTime?: string;
	startTimeMode?: TimeMode;
	endTimeMode?: TimeMode;
}

interface DateSelectProps {
	value?: Date;
	onChange?: (config: DateConfig) => void;
	label?: string;
	initialConfig?: DateConfig;
}

// Dropdown component for inline selections
function InlineSelect({
	value,
	options,
	onChange,
	id,
	openPopover,
	setOpenPopover,
}: {
	value: string;
	options: { value: string; label: string }[];
	onChange: (value: string) => void;
	id: string;
	openPopover: string | null;
	setOpenPopover: (id: string | null) => void;
}) {
	return (
		<Popover.Root
			open={openPopover === id}
			onOpenChange={(open: boolean) => setOpenPopover(open ? id : null)}
		>
			<Popover.Trigger asChild>
				<button
					type="button"
					className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/20 rounded text-blue-400 transition-all group"
				>
					<span className="font-medium">
						{options.find((o) => o.value === value)?.label || value}
					</span>
					<ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100" />
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className="bg-[hsl(var(--popover))] border border-[hsl(var(--border))] rounded-lg shadow-md p-1 z-10000 min-w-[140px]"
					sideOffset={5}
				>
					{options.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => {
								onChange(option.value);
								setOpenPopover(null);
							}}
							className={`w-full px-3 py-2 text-left text-sm rounded transition ${
								value === option.value
									? "bg-blue-500/15 text-blue-400"
									: "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
							}`}
						>
							{option.label}
						</button>
					))}
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}

// Date picker component
function DatePickerButton({
	date,
	onChange,
	placeholder,
	id,
	dateMode,
	openPopover,
	setOpenPopover,
}: {
	date?: Date;
	onChange: (date: Date | undefined) => void;
	placeholder: string;
	id: string;
	dateMode: DateMode;
	openPopover: string | null;
	setOpenPopover: (id: string | null) => void;
}) {
	return (
		<Popover.Root
			open={openPopover === id}
			onOpenChange={(open: boolean) => setOpenPopover(open ? id : null)}
		>
			<Popover.Trigger asChild>
				<button
					type="button"
					className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/20 rounded text-blue-400 transition-all group"
				>
					<span className="font-medium">
						{date
							? dateMode === "month-only"
								? format(date, "MMMM yyyy")
								: dateMode === "year-only"
									? format(date, "yyyy")
									: format(date, "MMM dd, yyyy")
							: placeholder}
					</span>
					<ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100" />
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className="bg-[hsl(var(--popover))] border border-[hsl(var(--border))] rounded-lg shadow-md p-4 z-10000"
					sideOffset={5}
				>
					<div className="rdp-custom">
						<style>{`
              .rdp-custom {
                --rdp-accent-color: #3b82f6;
                --rdp-background-color: rgba(59, 130, 246, 0.15);
              }
              .rdp-custom .rdp {
                margin: 0;
                color: hsl(var(--muted-foreground));
              }
              .rdp-custom .rdp-month_caption {
                color: hsl(var(--muted-foreground));
                font-weight: 500;
                margin-bottom: 0.5rem;
              }
              .rdp-custom .rdp-day {
                color: hsl(var(--foreground));
                border-radius: 4px;
              }
              .rdp-custom .rdp-day:hover:not(.rdp-day_selected) {
                background-color: hsl(var(--muted));
              }
              .rdp-custom .rdp-day_selected {
                background-color: #3b82f6;
                color: #ffffff;
              }
              .rdp-custom .rdp-day_outside {
                opacity: 0.3;
              }
              .rdp-custom .rdp-button:hover:not([disabled]) {
                background-color: hsl(var(--muted));
              }
              .rdp-custom .rdp-weekday {
                color: hsl(var(--muted-foreground));
                font-size: 0.75rem;
                font-weight: 500;
              }
            `}</style>
						<DayPicker
							mode="single"
							selected={date}
							onSelect={onChange}
							captionLayout={
								dateMode === "month-only" ? "dropdown-months" : "label"
							}
							showOutsideDays
						/>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}

// Time picker component
function TimePickerButton({
	time,
	onChange,
	id,
	openPopover,
	setOpenPopover,
	placeholder = "09:00",
}: {
	time?: string;
	onChange: (time: string) => void;
	id: string;
	openPopover: string | null;
	setOpenPopover: (id: string | null) => void;
	placeholder?: string;
}) {
	return (
		<Popover.Root
			open={openPopover === id}
			onOpenChange={(open: boolean) => setOpenPopover(open ? id : null)}
		>
			<Popover.Trigger asChild>
				<button
					type="button"
					className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/20 rounded text-blue-400 transition-all group"
				>
					<span className="font-medium">{time || placeholder}</span>
					<ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100" />
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className="bg-[hsl(var(--popover))] border border-[hsl(var(--border))] rounded-lg shadow-md p-3 z-10000"
					sideOffset={5}
				>
					<input
						type="time"
						value={time || ""}
						onChange={(e) => {
							onChange(e.target.value);
							setOpenPopover(null);
						}}
						className="px-3 py-2 bg-[hsl(var(--muted))] ring-1 ring-inset ring-[hsl(var(--border))] rounded text-[hsl(var(--foreground))] outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
					/>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}

// Helper to safely parse dates from various formats
function parseDate(dateValue: any): Date | undefined {
	if (!dateValue) return undefined;

	// If it's already a Date object
	if (dateValue instanceof Date) {
		// Check if it's a valid date
		return isNaN(dateValue.getTime()) ? undefined : dateValue;
	}

	// If it's a Firestore Timestamp
	if (dateValue?.toDate && typeof dateValue.toDate === "function") {
		return dateValue.toDate();
	}

	// If it's a string or number, try to parse it
	const parsed = new Date(dateValue);
	return isNaN(parsed.getTime()) ? undefined : parsed;
}

export function DateSelect({
	value,
	onChange,
	label,
	initialConfig,
}: DateSelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [eventType, setEventType] = useState<EventType>(
		initialConfig?.eventType || "single",
	);
	const [frequency, setFrequency] = useState<FrequencyType>(
		initialConfig?.frequency || "weekly",
	);
	const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(
		initialConfig?.dayOfWeek || "Monday",
	);
	const [dateMode, setDateMode] = useState<DateMode>(
		initialConfig?.dateMode || "datetime",
	);
	const [timeMode, setTimeMode] = useState<TimeMode>(
		initialConfig?.timeMode || "specific-time",
	);
	const [startDate, setStartDate] = useState<Date | undefined>(
		initialConfig?.startDate
			? parseDate(initialConfig.startDate)
			: value
				? parseDate(value)
				: undefined,
	);
	const [endDate, setEndDate] = useState<Date | undefined>(
		initialConfig?.endDate ? parseDate(initialConfig.endDate) : undefined,
	);
	const [time, setTime] = useState<string | undefined>(
		initialConfig?.time && initialConfig.timeMode === "specific-time"
			? initialConfig.time
			: undefined,
	);

	// For recurring events - separate start and end times
	const [startTime, setStartTime] = useState<string | undefined>(
		initialConfig?.startTime && initialConfig.startTimeMode === "specific-time"
			? initialConfig.startTime
			: undefined,
	);
	const [endTime, setEndTime] = useState<string | undefined>(
		initialConfig?.endTime && initialConfig.endTimeMode === "specific-time"
			? initialConfig.endTime
			: undefined,
	);
	const [startTimeMode, setStartTimeMode] = useState<TimeMode>(
		initialConfig?.startTimeMode || "none",
	);
	const [endTimeMode, setEndTimeMode] = useState<TimeMode>(
		initialConfig?.endTimeMode || "none",
	);

	const [openPopover, setOpenPopover] = useState<string | null>(null);

	const handleUpdate = (updates: Partial<DateConfig>) => {
		const config: DateConfig = {
			eventType,
			startDate,
			endDate,
			time:
				timeMode === "all-day"
					? "00:00"
					: timeMode === "none"
						? undefined
						: time || "09:00",
			dateMode,
			timeMode,
			frequency,
			dayOfWeek,
			// For recurring events
			startTime:
				startTimeMode === "all-day"
					? "00:00"
					: startTimeMode === "none"
						? undefined
						: startTime || "09:00",
			endTime:
				endTimeMode === "all-day"
					? "00:00"
					: endTimeMode === "none"
						? undefined
						: endTime || "17:00",
			startTimeMode,
			endTimeMode,
			...updates,
		};
		onChange?.(config);
	};

	const handleEventTypeChange = (type: EventType) => {
		setEventType(type);
		handleUpdate({ eventType: type });
	};

	const handleFrequencyChange = (freq: FrequencyType) => {
		setFrequency(freq);
		handleUpdate({ frequency: freq });
	};

	const handleDayOfWeekChange = (day: DayOfWeek) => {
		setDayOfWeek(day);
		handleUpdate({ dayOfWeek: day });
	};

	const handleDateModeChange = (mode: DateMode) => {
		setDateMode(mode);
		handleUpdate({ dateMode: mode });
	};

	const handleTimeModeChange = (mode: TimeMode) => {
		setTimeMode(mode);
		if (mode === "none") {
			setTime(undefined);
		} else if (mode === "specific-time" && !time) {
			setTime("09:00");
		}
		handleUpdate({ timeMode: mode });
	};

	const handleStartTimeModeChange = (mode: TimeMode) => {
		setStartTimeMode(mode);
		if (mode === "none") {
			setStartTime(undefined);
		} else if (mode === "specific-time" && !startTime) {
			setStartTime("09:00");
		}
		handleUpdate({ startTimeMode: mode });
	};

	const handleEndTimeModeChange = (mode: TimeMode) => {
		setEndTimeMode(mode);
		if (mode === "none") {
			setEndTime(undefined);
		} else if (mode === "specific-time" && !endTime) {
			setEndTime("17:00");
		}
		handleUpdate({ endTimeMode: mode });
	};

	const handleStartDateChange = (date: Date | undefined) => {
		setStartDate(date);
		handleUpdate({ startDate: date });
		setOpenPopover(null);
	};

	const handleEndDateChange = (date: Date | undefined) => {
		setEndDate(date);
		handleUpdate({ endDate: date });
		setOpenPopover(null);
	};

	const handleTimeChange = (newTime: string) => {
		setTime(newTime);
		handleUpdate({ time: newTime });
	};

	const handleStartTimeChange = (newTime: string) => {
		setStartTime(newTime);
		handleUpdate({ startTime: newTime });
	};

	const handleEndTimeChange = (newTime: string) => {
		setEndTime(newTime);
		handleUpdate({ endTime: newTime });
	};

	const handleConfirm = () => {
		handleUpdate({
			eventType,
			startDate,
			endDate,
			time:
				timeMode === "all-day"
					? "00:00"
					: timeMode === "none"
						? undefined
						: time || "09:00",
			dateMode,
			timeMode,
			frequency,
			dayOfWeek,
			startTime:
				startTimeMode === "all-day"
					? "00:00"
					: startTimeMode === "none"
						? undefined
						: startTime || "09:00",
			endTime:
				endTimeMode === "all-day"
					? "00:00"
					: endTimeMode === "none"
						? undefined
						: endTime || "17:00",
			startTimeMode,
			endTimeMode,
		});
		setIsOpen(false);
	};

	// Format display value for the button
	const formatDisplayValue = () => {
		if (!startDate) return "Select date";

		// Parse dates to ensure they're valid
		const parsedStart = parseDate(startDate);
		if (!parsedStart) return "Select date";

		const timeDisplay =
			timeMode === "none" || timeMode === "all-day"
				? ""
				: time
					? ` at ${time}`
					: "";

		try {
			if (eventType === "single") {
				if (dateMode === "datetime") {
					return `${format(parsedStart, "MMM dd, yyyy")}${timeDisplay}`;
				}
				if (dateMode === "date-only") {
					return format(parsedStart, "MMM dd, yyyy");
				}
				if (dateMode === "month-only") {
					return format(parsedStart, "MMMM yyyy");
				}
				if (dateMode === "year-only") {
					return format(parsedStart, "yyyy");
				}
			}

			if (eventType === "recurring") {
				const parsedEnd = endDate ? parseDate(endDate) : null;

				// Build time info for start and end
				const startTimeInfo =
					dateMode === "datetime" &&
					startTimeMode !== "none" &&
					startTimeMode !== "all-day" &&
					startTime
						? ` at ${startTime}`
						: "";
				const endTimeInfo =
					parsedEnd &&
					dateMode === "datetime" &&
					endTimeMode !== "none" &&
					endTimeMode !== "all-day" &&
					endTime
						? ` at ${endTime}`
						: "";

				if (frequency === "specific-day") {
					const dayLabel = `${dayOfWeek}s`;
					return parsedEnd
						? `${dayLabel} from ${format(parsedStart, "MMM dd")}${startTimeInfo} to ${format(parsedEnd, "MMM dd")}${endTimeInfo}`
						: `Every ${dayOfWeek}${startTimeInfo}`;
				}
				if (frequency === "weekends") {
					return parsedEnd
						? `Weekends from ${format(parsedStart, "MMM dd")}${startTimeInfo} to ${format(parsedEnd, "MMM dd")}${endTimeInfo}`
						: `Every weekend${startTimeInfo}`;
				}
				const freqLabel =
					frequency === "daily"
						? "Daily"
						: frequency === "weekly"
							? "Weekly"
							: "Monthly";
				return parsedEnd
					? `${freqLabel} from ${format(parsedStart, "MMM dd")}${startTimeInfo} to ${format(parsedEnd, "MMM dd")}${endTimeInfo}`
					: `Every ${frequency === "daily" ? "day" : frequency === "weekly" ? "week" : "month"}${startTimeInfo}`;
			}
		} catch (error) {
			console.error("Error formatting date:", error);
			return "Invalid date";
		}

		return "Select date";
	};

	// Render the questionnaire sentence
	const renderQuestionnaire = () => {
		// Mode selector first
		const modeOptions = [
			{ value: "datetime", label: "Date & Time" },
			{ value: "date-only", label: "Date Only" },
			{ value: "month-only", label: "Month Only" },
			{ value: "year-only", label: "Year Only" },
		];

		const timeModeOptions = [
			{ value: "none", label: "None" },
			{ value: "specific-time", label: "Specific time" },
			{ value: "all-day", label: "All day" },
		];

		if (eventType === "single") {
			if (dateMode === "datetime") {
				return (
					<div className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-2">
						<InlineSelect
							value={dateMode}
							options={modeOptions}
							onChange={(v) => handleDateModeChange(v as DateMode)}
							id="date-mode"
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
						<span>on</span>
						<DatePickerButton
							date={startDate}
							onChange={handleStartDateChange}
							placeholder="<select date>"
							id="start-date"
							dateMode={dateMode}
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
						{timeMode === "specific-time" ? (
							<>
								<span>at</span>
								<TimePickerButton
									time={time}
									onChange={handleTimeChange}
									id="time"
									openPopover={openPopover}
									setOpenPopover={setOpenPopover}
								/>
							</>
						) : (
							<>
								<span>-</span>
								<InlineSelect
									value={timeMode}
									options={timeModeOptions}
									onChange={(v) => handleTimeModeChange(v as TimeMode)}
									id="time-mode"
									openPopover={openPopover}
									setOpenPopover={setOpenPopover}
								/>
							</>
						)}
					</div>
				);
			}
			if (dateMode === "date-only") {
				return (
					<div className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-2">
						<InlineSelect
							value={dateMode}
							options={modeOptions}
							onChange={(v) => handleDateModeChange(v as DateMode)}
							id="date-mode"
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
						<span>on</span>
						<DatePickerButton
							date={startDate}
							onChange={handleStartDateChange}
							placeholder="<select date>"
							id="start-date"
							dateMode={dateMode}
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
					</div>
				);
			}
			if (dateMode === "month-only") {
				return (
					<div className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-2">
						<InlineSelect
							value={dateMode}
							options={modeOptions}
							onChange={(v) => handleDateModeChange(v as DateMode)}
							id="date-mode"
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
						<span>in</span>
						<DatePickerButton
							date={startDate}
							onChange={handleStartDateChange}
							placeholder="<select month>"
							id="start-date"
							dateMode={dateMode}
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
					</div>
				);
			}
			if (dateMode === "year-only") {
				return (
					<div className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-2">
						<InlineSelect
							value={dateMode}
							options={modeOptions}
							onChange={(v) => handleDateModeChange(v as DateMode)}
							id="date-mode"
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
						<span>in</span>
						<DatePickerButton
							date={startDate}
							onChange={handleStartDateChange}
							placeholder="<select year>"
							id="start-date"
							dateMode={dateMode}
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
					</div>
				);
			}
		}

		if (eventType === "recurring") {
			const frequencyOptions = [
				{ value: "daily", label: "day" },
				{ value: "weekly", label: "week" },
				{ value: "monthly", label: "month" },
				{ value: "weekends", label: "weekend" },
				{ value: "specific-day", label: "specific day" },
			];

			const dayOptions: { value: DayOfWeek; label: string }[] = [
				{ value: "Monday", label: "Monday" },
				{ value: "Tuesday", label: "Tuesday" },
				{ value: "Wednesday", label: "Wednesday" },
				{ value: "Thursday", label: "Thursday" },
				{ value: "Friday", label: "Friday" },
				{ value: "Saturday", label: "Saturday" },
				{ value: "Sunday", label: "Sunday" },
			];

			if (frequency === "specific-day") {
				return (
					<div className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-2">
						<span>Every</span>
						<InlineSelect
							value={dayOfWeek}
							options={dayOptions}
							onChange={(v) => handleDayOfWeekChange(v as DayOfWeek)}
							id="day-of-week"
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
						<span>starting from</span>
						<DatePickerButton
							date={startDate}
							onChange={handleStartDateChange}
							placeholder="<start date>"
							id="start-date"
							dateMode={dateMode}
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
						{dateMode === "datetime" && (
							<>
								<span>at</span>
								{startTimeMode === "specific-time" ? (
									<TimePickerButton
										time={startTime}
										onChange={handleStartTimeChange}
										id="start-time"
										openPopover={openPopover}
										setOpenPopover={setOpenPopover}
									/>
								) : (
									<InlineSelect
										value={startTimeMode}
										options={timeModeOptions}
										onChange={(v) => handleStartTimeModeChange(v as TimeMode)}
										id="start-time-mode"
										openPopover={openPopover}
										setOpenPopover={setOpenPopover}
									/>
								)}
							</>
						)}
						<span>to</span>
						<DatePickerButton
							date={endDate}
							onChange={handleEndDateChange}
							placeholder="<end date>"
							id="end-date"
							dateMode={dateMode}
							openPopover={openPopover}
							setOpenPopover={setOpenPopover}
						/>
						{dateMode === "datetime" && (
							<>
								<span>at</span>
								{endTimeMode === "specific-time" ? (
									<TimePickerButton
										time={endTime}
										onChange={handleEndTimeChange}
										id="end-time"
										openPopover={openPopover}
										setOpenPopover={setOpenPopover}
									/>
								) : (
									<InlineSelect
										value={endTimeMode}
										options={timeModeOptions}
										onChange={(v) => handleEndTimeModeChange(v as TimeMode)}
										id="end-time-mode"
										openPopover={openPopover}
										setOpenPopover={setOpenPopover}
									/>
								)}
							</>
						)}
					</div>
				);
			}

			return (
				<div className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-2">
					<span>Every</span>
					<InlineSelect
						value={frequency}
						options={frequencyOptions}
						onChange={(v) => handleFrequencyChange(v as FrequencyType)}
						id="frequency"
						openPopover={openPopover}
						setOpenPopover={setOpenPopover}
					/>
					<span>starting from</span>
					<DatePickerButton
						date={startDate}
						onChange={handleStartDateChange}
						placeholder="<start date>"
						id="start-date"
						dateMode={dateMode}
						openPopover={openPopover}
						setOpenPopover={setOpenPopover}
					/>
					{dateMode === "datetime" && (
						<>
							<span>-</span>
							<InlineSelect
								value={startTimeMode}
								options={timeModeOptions}
								onChange={(v) => handleStartTimeModeChange(v as TimeMode)}
								id="start-time-mode-specific"
								openPopover={openPopover}
								setOpenPopover={setOpenPopover}
							/>
							{startTimeMode === "specific-time" && (
								<>
									<span>at</span>
									<TimePickerButton
										time={startTime}
										onChange={handleStartTimeChange}
										id="start-time-specific"
										placeholder="<start time>"
										openPopover={openPopover}
										setOpenPopover={setOpenPopover}
									/>
								</>
							)}
						</>
					)}
					<span>to</span>
					<DatePickerButton
						date={endDate}
						onChange={handleEndDateChange}
						placeholder="<end date>"
						id="end-date"
						dateMode={dateMode}
						openPopover={openPopover}
						setOpenPopover={setOpenPopover}
					/>
					{dateMode === "datetime" && (
						<>
							<span>-</span>
							<InlineSelect
								value={endTimeMode}
								options={timeModeOptions}
								onChange={(v) => handleEndTimeModeChange(v as TimeMode)}
								id="end-time-mode-specific"
								openPopover={openPopover}
								setOpenPopover={setOpenPopover}
							/>
							{endTimeMode === "specific-time" && (
								<>
									<span>at</span>
									<TimePickerButton
										time={endTime}
										onChange={handleEndTimeChange}
										id="end-time-specific"
										placeholder="<end time>"
										openPopover={openPopover}
										setOpenPopover={setOpenPopover}
									/>
								</>
							)}
						</>
					)}
				</div>
			);
		}
	};

	return (
		<div className="w-full">
			{label && (
				<label className="block text-sm text-[hsl(var(--muted-foreground))] mb-2">{label}</label>
			)}

			<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
				<Dialog.Trigger asChild>
					<button
						type="button"
						className="w-full px-3 py-2 bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-[4px] text-[hsl(var(--foreground))] text-left hover:border-[hsl(var(--border))]/80 transition-all flex items-center gap-2"
					>
						<Calendar className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
						<span className="flex-1">{formatDisplayValue()}</span>
					</button>
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-[6px] z-9998" />
					<Dialog.Content className="fixed w-fit max-w-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-md p-6 z-9999">
						<Dialog.Title className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
							Select Date & Time
						</Dialog.Title>

						<div className="space-y-4">
							{/* Event type selector */}
							<div className="flex items-center gap-2">
								<span className="text-[hsl(var(--muted-foreground))] text-sm">Event type:</span>
								<InlineSelect
									value={eventType}
									options={[
										{ value: "single", label: "Single Event" },
										{ value: "recurring", label: "Recurring Event" },
									]}
									onChange={(v) => handleEventTypeChange(v as EventType)}
									id="event-type"
									openPopover={openPopover}
									setOpenPopover={setOpenPopover}
								/>
							</div>

							{/* Questionnaire sentence */}
							<div className="p-4 bg-[hsl(var(--muted))] rounded border border-[hsl(var(--border))] min-h-[60px]">
								{renderQuestionnaire()}
							</div>

							{/* Summary */}
							{startDate && (
								<div className="text-xs text-[hsl(var(--muted-foreground))] text-center pt-2 border-t border-[hsl(var(--border))]">
									{eventType === "single" ? (
										<>
											{dateMode === "datetime" && (
												<>
													{format(startDate, "MMMM dd, yyyy")} at {time}
												</>
											)}
											{dateMode === "date-only" && (
												<>{format(startDate, "MMMM dd, yyyy")}</>
											)}
											{dateMode === "month-only" && (
												<>{format(startDate, "MMMM yyyy")}</>
											)}
											{dateMode === "year-only" && (
												<>{format(startDate, "yyyy")}</>
											)}
										</>
									) : (
										<>
											{frequency === "specific-day" && (
												<>
													Every {dayOfWeek} starting from{" "}
													{format(startDate, "MMM dd")}
													{dateMode === "datetime" && (
														<>
															{" "}
															at{" "}
															{startTimeMode === "all-day"
																? "all day"
																: startTime}
														</>
													)}
													{endDate && (
														<> to {format(endDate, "MMM dd, yyyy")}</>
													)}
													{endDate && dateMode === "datetime" && (
														<>
															{" "}
															at{" "}
															{endTimeMode === "all-day" ? "all day" : endTime}
														</>
													)}
												</>
											)}
											{frequency === "weekends" && (
												<>
													Every weekend starting from{" "}
													{format(startDate, "MMM dd")}
													{dateMode === "datetime" && (
														<>
															{" "}
															at{" "}
															{startTimeMode === "all-day"
																? "all day"
																: startTime}
														</>
													)}
													{endDate && (
														<> to {format(endDate, "MMM dd, yyyy")}</>
													)}
													{endDate && dateMode === "datetime" && (
														<>
															{" "}
															at{" "}
															{endTimeMode === "all-day" ? "all day" : endTime}
														</>
													)}
												</>
											)}
											{(frequency === "daily" ||
												frequency === "weekly" ||
												frequency === "monthly") && (
												<>
													Every {frequency === "daily" && "day"}
													{frequency === "weekly" && "week"}
													{frequency === "monthly" && "month"} starting from{" "}
													{format(startDate, "MMM dd")}
													{dateMode === "datetime" && (
														<>
															{" "}
															at{" "}
															{startTimeMode === "all-day"
																? "all day"
																: startTime}
														</>
													)}
													{endDate && (
														<> to {format(endDate, "MMM dd, yyyy")}</>
													)}
													{endDate && dateMode === "datetime" && (
														<>
															{" "}
															at{" "}
															{endTimeMode === "all-day" ? "all day" : endTime}
														</>
													)}
												</>
											)}
										</>
									)}
								</div>
							)}
						</div>

						{/* Actions */}
						<div className="flex justify-end gap-2 mt-6">
							<Dialog.Close asChild>
								<button
									type="button"
									className="px-4 py-2 bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80 transition"
								>
									Cancel
								</button>
							</Dialog.Close>
							<button
								type="button"
								onClick={handleConfirm}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
							>
								Confirm
							</button>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}
