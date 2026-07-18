import {
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Select } from "../../../src/components/select";

describe("Select", () => {
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

	afterEach(() => vi.unstubAllGlobals());

	it("contains the dropdown at the trigger width and truncates option labels", () => {
		render(
			<Select
				searchable={4}
				options={[
					{
						value: "alpha",
						label: "A voice name that is much wider than the trigger",
					},
					{ value: "beta", label: "Second Voice", disabled: true },
					{ value: "gamma", label: "Third Voice" },
				]}
			/>,
		);

		const trigger = screen.getByRole("button");
		vi.spyOn(trigger, "getBoundingClientRect").mockReturnValue({
			bottom: 736,
			height: 36,
			left: 20,
			right: 100,
			top: 700,
			width: 80,
			x: 20,
			y: 700,
			toJSON: () => ({}),
		});

		fireEvent.click(trigger);
		const listbox = screen.getByRole("listbox");
		expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
		expect(listbox).toHaveClass("max-h-80", "overflow-y-auto");
		expect(listbox.parentElement).toHaveStyle({
			bottom: "72px",
			maxHeight: "320px",
			width: "80px",
		});
		expect(
			within(listbox).getByText(
				"A voice name that is much wider than the trigger",
			),
		).toHaveClass("min-w-0", "flex-1", "truncate");
	});

	it("filters at the configured threshold without stealing focus", async () => {
		const onChange = vi.fn();
		render(
			<Select
				searchable={3}
				onChange={onChange}
				options={[
					{ value: "alpha", label: <span>First Voice</span> },
					{ value: "beta", label: "Second Voice", disabled: true },
					{ value: "gamma", label: "Third Voice" },
				]}
			/>,
		);

		const trigger = screen.getByRole("button");
		trigger.focus();
		fireEvent.click(trigger);
		const search = screen.getByRole("searchbox");
		const listbox = screen.getByRole("listbox");
		expect(trigger).toHaveFocus();
		expect(search).not.toHaveFocus();

		fireEvent.mouseDown(search);
		expect(screen.getByRole("listbox")).toBeInTheDocument();

		fireEvent.change(search, { target: { value: "FIRST" } });
		expect(within(listbox).getByText("First Voice")).toBeInTheDocument();
		expect(within(listbox).queryByText("Third Voice")).not.toBeInTheDocument();

		fireEvent.change(search, { target: { value: "" } });
		fireEvent.keyDown(search, { key: "ArrowDown" });
		fireEvent.keyDown(search, { key: "Enter" });
		expect(onChange).toHaveBeenCalledWith({ target: { value: "gamma" } });

		await waitFor(() =>
			expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
		);
		fireEvent.click(trigger);
		const navigatedSearch = screen.getByRole("searchbox");
		fireEvent.change(navigatedSearch, { target: { value: "GAMMA" } });
		expect(screen.getByText("Third Voice")).toBeInTheDocument();
		fireEvent.keyDown(navigatedSearch, { key: "Enter" });
		expect(onChange).toHaveBeenLastCalledWith({ target: { value: "gamma" } });

		await waitFor(() =>
			expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
		);
		fireEvent.click(trigger);
		const reopenedSearch = screen.getByRole("searchbox");
		expect(reopenedSearch).toHaveValue("GAMMA");

		fireEvent.keyDown(reopenedSearch, { key: "Escape" });
		expect(reopenedSearch).toHaveValue("");
		expect(screen.getByRole("listbox")).toBeInTheDocument();

		fireEvent.keyDown(reopenedSearch, { key: "Escape" });
		await waitFor(() =>
			expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
		);
		expect(trigger).toHaveFocus();
	});
});
