import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../../../src/components/floating";

function rect(top: number, left: number, width: number, height: number): DOMRect {
	return {
		bottom: top + height,
		height,
		left,
		right: left + width,
		top,
		width,
		x: left,
		y: top,
		toJSON: () => ({}),
	};
}

function translatedRect(element: HTMLElement, value: DOMRect): DOMRect {
	const [x = "0", y = "0"] = element.style.translate.split(" ");
	return rect(
		value.top + (Number.parseFloat(y) || 0),
		value.left + (Number.parseFloat(x) || 0),
		value.width,
		value.height,
	);
}

describe("Floating", () => {
	beforeEach(() => {
		vi.stubGlobal(
			"matchMedia",
			vi.fn((media: string) => ({
				matches: false,
				media,
				onchange: null,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				addListener: vi.fn(),
				removeListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		);
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	it("keeps an intrinsically sized right-edge tooltip inside the viewport", async () => {
		vi.stubGlobal("innerWidth", 1000);
		vi.stubGlobal("innerHeight", 800);
		let triggerRect = rect(200, 960, 40, 40);
		let contentRect = rect(150, 880, 200, 44);
		vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
			function (this: HTMLElement) {
				return this.hasAttribute("data-floating-content")
					? translatedRect(this, contentRect)
					: triggerRect;
			},
		);

		const { rerender } = render(
			<Tooltip open={false}>
				<TooltipTrigger asChild>
					<button type="button">Report</button>
				</TooltipTrigger>
				<TooltipContent>Open render report</TooltipContent>
			</Tooltip>,
		);
		rerender(
			<Tooltip open>
				<TooltipTrigger asChild>
					<button type="button">Report</button>
				</TooltipTrigger>
				<TooltipContent>Open render report</TooltipContent>
			</Tooltip>,
		);

		const tooltip = await screen.findByRole("tooltip");
		expect(tooltip).toHaveClass(
			"w-max",
			"max-w-[calc(100vw-1rem)]",
		);
		await waitFor(() =>
			expect(tooltip).toHaveStyle({
				left: "980px",
				transform: "translateY(-100%) translateX(-50%)",
				translate: "-88px 0px",
			}),
		);

		triggerRect = rect(200, 0, 40, 40);
		contentRect = rect(150, -80, 200, 44);
		fireEvent.scroll(window);
		await waitFor(() =>
			expect(tooltip).toHaveStyle({ left: "20px", translate: "88px 0px" }),
		);

		vi.stubGlobal("innerWidth", 600);
		triggerRect = rect(200, 560, 40, 40);
		contentRect = rect(150, 500, 150, 44);
		fireEvent(window, new Event("resize"));
		await waitFor(() =>
			expect(tooltip).toHaveStyle({ left: "580px", translate: "-58px 0px" }),
		);
	});

	it("clamps popovers on both viewport axes without replacing placement transforms", async () => {
		vi.stubGlobal("innerWidth", 1000);
		vi.stubGlobal("innerHeight", 800);
		const contentRect = rect(-100, -280, 288, 280);
		vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
			function (this: HTMLElement) {
				return this.hasAttribute("data-floating-content")
					? translatedRect(this, contentRect)
					: rect(20, 10, 40, 40);
			},
		);

		render(
			<Popover open>
				<PopoverTrigger asChild>
					<button type="button">Details</button>
				</PopoverTrigger>
				<PopoverContent side="left">Popover details</PopoverContent>
			</Popover>,
		);

		const popover = await waitFor(() =>
			document.querySelector<HTMLElement>("[data-floating-content]"),
		);
		expect(popover).toHaveClass(
			"w-72",
			"max-w-[calc(100vw-1rem)]",
		);
		await waitFor(() =>
			expect(popover).toHaveStyle({
				translate: "288px 108px",
			}),
		);
	});
});
