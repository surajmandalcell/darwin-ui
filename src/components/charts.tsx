"use client";

import {
	Area,
	Bar,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	Pie,
	AreaChart as RechartsAreaChart,
	BarChart as RechartsBarChart,
	LineChart as RechartsLineChart,
	PieChart as RechartsPieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

// Darwin UI color palette - uses CSS variables for theming
// These are resolved at render time using getComputedStyle
const getCSSColor = (varName: string, fallback: string): string => {
	if (typeof window === "undefined") return fallback;
	const value = getComputedStyle(document.documentElement)
		.getPropertyValue(varName)
		.trim();
	if (!value) return fallback;
	return `hsl(${value})`;
};

// Fallback colors for SSR
const FALLBACK_COLORS = {
	blue: "#60a5fa",
	green: "#34d399",
	yellow: "#fbbf24",
	red: "#f87171",
	purple: "#a78bfa",
	pink: "#f472b6",
	orange: "#fb923c",
	teal: "#2dd4bf",
};

// Chart color getters
const getChartColors = () => ({
	blue: getCSSColor("--chart-blue", FALLBACK_COLORS.blue),
	green: getCSSColor("--chart-green", FALLBACK_COLORS.green),
	yellow: getCSSColor("--chart-yellow", FALLBACK_COLORS.yellow),
	red: getCSSColor("--chart-red", FALLBACK_COLORS.red),
	purple: getCSSColor("--chart-purple", FALLBACK_COLORS.purple),
	pink: getCSSColor("--chart-pink", FALLBACK_COLORS.pink),
	orange: getCSSColor("--chart-orange", FALLBACK_COLORS.orange),
	teal: getCSSColor("--chart-teal", FALLBACK_COLORS.teal),
});

const getDefaultColors = () => {
	const colors = getChartColors();
	return [
		colors.blue,
		colors.green,
		colors.yellow,
		colors.red,
		colors.purple,
		colors.pink,
		colors.orange,
		colors.teal,
	];
};

// For SSR, provide static fallbacks
const DEFAULT_COLORS = Object.values(FALLBACK_COLORS);

// Custom Tooltip Component
interface TooltipPayload {
	color: string;
	name: string;
	value: number;
}

interface CustomTooltipProps {
	active?: boolean;
	payload?: TooltipPayload[];
	label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-zinc-900/95 border border-white/10 rounded-md p-3 shadow-sm backdrop-blur-sm">
				{label && (
					<p className="text-zinc-100 font-medium mb-2">
						{label}
					</p>
				)}
				{payload.map((entry, index) => (
					<div
						key={`${entry.name}-${index}`}
						className="flex items-center gap-2 text-sm"
					>
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-zinc-400">
							{entry.name}:
						</span>
						<span className="text-zinc-100 font-medium">
							{entry.value}
						</span>
					</div>
				))}
			</div>
		);
	}
	return null;
};

// Bar Chart Component
export interface BarChartProps {
	data: Record<string, string | number>[];
	xKey: string;
	bars: Array<{ dataKey: string; fill?: string; name?: string }>;
	height?: number;
	showGrid?: boolean;
	showLegend?: boolean;
}

export function BarChart({
	data,
	xKey,
	bars,
	height = 300,
	showGrid = true,
	showLegend = false,
}: BarChartProps) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<RechartsBarChart data={data}>
				{showGrid && (
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="#27272a"
					/>
				)}
				<XAxis
					dataKey={xKey}
					stroke="#3f3f46"
					tick={{ fill: "#a1a1aa", fontSize: 12 }}
				/>
				<YAxis
					stroke="#3f3f46"
					tick={{ fill: "#a1a1aa", fontSize: 12 }}
				/>
				<Tooltip content={<CustomTooltip />} />
				{showLegend && (
					<Legend
						wrapperStyle={{ color: "#a1a1aa" }}
						iconType="circle"
					/>
				)}
				{bars.map((bar, index) => (
					<Bar
						key={bar.dataKey}
						dataKey={bar.dataKey}
						fill={bar.fill || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
						name={bar.name || bar.dataKey}
						radius={[4, 4, 0, 0]}
					/>
				))}
			</RechartsBarChart>
		</ResponsiveContainer>
	);
}

// Line Chart Component
export interface LineChartProps {
	data: Record<string, string | number>[];
	xKey: string;
	lines: Array<{
		dataKey: string;
		stroke?: string;
		name?: string;
		strokeWidth?: number;
	}>;
	height?: number;
	showGrid?: boolean;
	showLegend?: boolean;
}

export function LineChart({
	data,
	xKey,
	lines,
	height = 300,
	showGrid = true,
	showLegend = true,
}: LineChartProps) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<RechartsLineChart data={data}>
				{showGrid && (
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="#27272a"
					/>
				)}
				<XAxis
					dataKey={xKey}
					stroke="#3f3f46"
					tick={{ fill: "#a1a1aa", fontSize: 12 }}
				/>
				<YAxis
					stroke="#3f3f46"
					tick={{ fill: "#a1a1aa", fontSize: 12 }}
				/>
				<Tooltip content={<CustomTooltip />} />
				{showLegend && (
					<Legend
						wrapperStyle={{ color: "#a1a1aa" }}
						iconType="circle"
					/>
				)}
				{lines.map((line, index) => (
					<Line
						key={line.dataKey}
						type="monotone"
						dataKey={line.dataKey}
						stroke={
							line.stroke || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
						}
						name={line.name || line.dataKey}
						strokeWidth={line.strokeWidth || 2}
						dot={{
							fill:
								line.stroke || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
							r: 4,
						}}
						activeDot={{ r: 6 }}
					/>
				))}
			</RechartsLineChart>
		</ResponsiveContainer>
	);
}

// Area Chart Component
export interface AreaChartProps {
	data: Record<string, string | number>[];
	xKey: string;
	areas: Array<{
		dataKey: string;
		fill?: string;
		stroke?: string;
		name?: string;
	}>;
	height?: number;
	showGrid?: boolean;
	showLegend?: boolean;
	stacked?: boolean;
}

export function AreaChart({
	data,
	xKey,
	areas,
	height = 300,
	showGrid = true,
	showLegend = true,
	stacked = false,
}: AreaChartProps) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<RechartsAreaChart data={data}>
				{showGrid && (
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="#27272a"
					/>
				)}
				<XAxis
					dataKey={xKey}
					stroke="#3f3f46"
					tick={{ fill: "#a1a1aa", fontSize: 12 }}
				/>
				<YAxis
					stroke="#3f3f46"
					tick={{ fill: "#a1a1aa", fontSize: 12 }}
				/>
				<Tooltip content={<CustomTooltip />} />
				{showLegend && (
					<Legend
						wrapperStyle={{ color: "#a1a1aa" }}
						iconType="circle"
					/>
				)}
				{areas.map((area, index) => (
					<Area
						key={area.dataKey}
						type="monotone"
						dataKey={area.dataKey}
						stackId={stacked ? "1" : undefined}
						fill={area.fill || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
						stroke={
							area.stroke || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
						}
						name={area.name || area.dataKey}
						fillOpacity={0.6}
					/>
				))}
			</RechartsAreaChart>
		</ResponsiveContainer>
	);
}

// Pie Chart Component
interface PieDataItem {
	[key: string]: string | number;
}

export interface PieChartProps {
	data: PieDataItem[];
	nameKey: string;
	valueKey: string;
	height?: number;
	innerRadius?: number;
	outerRadius?: number;
	colors?: string[];
	showLegend?: boolean;
}

export function PieChart({
	data,
	nameKey,
	valueKey,
	height = 300,
	innerRadius = 0,
	outerRadius = 80,
	colors = DEFAULT_COLORS,
	showLegend = true,
}: PieChartProps) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<RechartsPieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					dataKey={valueKey}
					nameKey={nameKey}
					label={(props) => {
						const entry = data[props.index];
						return `${entry[nameKey]}: ${entry[valueKey]}`;
					}}
					labelLine={{ stroke: "#3f3f46" }}
				>
					{data.map((item, index) => (
						<Cell
							key={`cell-${item[nameKey]}-${index}`}
							fill={colors[index % colors.length]}
						/>
					))}
				</Pie>
				<Tooltip content={<CustomTooltip />} />
				{showLegend && (
					<Legend
						wrapperStyle={{ color: "#a1a1aa" }}
						iconType="circle"
					/>
				)}
			</RechartsPieChart>
		</ResponsiveContainer>
	);
}

// Donut Chart Component (Pie with inner radius)
export interface DonutChartProps extends PieChartProps {}

export function DonutChart({
	data,
	nameKey,
	valueKey,
	height = 300,
	innerRadius = 60,
	outerRadius = 80,
	colors = DEFAULT_COLORS,
	showLegend = true,
}: DonutChartProps) {
	return (
		<PieChart
			data={data}
			nameKey={nameKey}
			valueKey={valueKey}
			height={height}
			innerRadius={innerRadius}
			outerRadius={outerRadius}
			colors={colors}
			showLegend={showLegend}
		/>
	);
}

// Stacked Bar Chart Component
export interface StackedBarChartProps {
	data: Record<string, string | number>[];
	xKey: string;
	stackKeys: Array<{ dataKey: string; fill?: string; name?: string }>;
	height?: number;
	showGrid?: boolean;
	showLegend?: boolean;
}

export function StackedBarChart({
	data,
	xKey,
	stackKeys,
	height = 300,
	showGrid = true,
	showLegend = true,
}: StackedBarChartProps) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<RechartsBarChart data={data}>
				{showGrid && (
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="#27272a"
					/>
				)}
				<XAxis
					dataKey={xKey}
					stroke="#3f3f46"
					tick={{ fill: "#a1a1aa", fontSize: 12 }}
				/>
				<YAxis
					stroke="#3f3f46"
					tick={{ fill: "#a1a1aa", fontSize: 12 }}
				/>
				<Tooltip content={<CustomTooltip />} />
				{showLegend && (
					<Legend
						wrapperStyle={{ color: "#a1a1aa" }}
						iconType="circle"
					/>
				)}
				{stackKeys.map((stack, index) => (
					<Bar
						key={stack.dataKey}
						dataKey={stack.dataKey}
						stackId="a"
						fill={stack.fill || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
						name={stack.name || stack.dataKey}
						radius={index === stackKeys.length - 1 ? [4, 4, 0, 0] : undefined}
					/>
				))}
			</RechartsBarChart>
		</ResponsiveContainer>
	);
}
