import {
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "../../../src/components/select";

describe("Select", () => {
	it("keeps searchable options scrollable, positioned, and keyboard accessible", async () => {
		const onChange = vi.fn();
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
		render(
			<Select
				searchable
				onChange={onChange}
				options={[
					{ value: "alpha", label: <span>First Voice</span> },
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
			right: 220,
			top: 700,
			width: 200,
			x: 20,
			y: 700,
			toJSON: () => ({}),
		});

		fireEvent.click(trigger);
		const search = screen.getByRole("searchbox");
		const listbox = screen.getByRole("listbox");
		expect(listbox).toHaveClass("max-h-80", "overflow-y-auto");
		expect(listbox.parentElement).toHaveStyle({
			bottom: "72px",
			maxHeight: "362px",
		});

		fireEvent.mouseDown(search);
		expect(screen.getByRole("listbox")).toBeInTheDocument();

		fireEvent.change(search, { target: { value: "FIRST" } });
		expect(within(listbox).getByText("First Voice")).toBeInTheDocument();
		expect(within(listbox).queryByText("Third Voice")).not.toBeInTheDocument();

		fireEvent.change(search, { target: { value: "GAMMA" } });
		expect(within(listbox).getByText("Third Voice")).toBeInTheDocument();

		fireEvent.change(search, { target: { value: "" } });
		fireEvent.keyDown(search, { key: "ArrowDown" });
		fireEvent.keyDown(search, { key: "Enter" });
		expect(onChange).toHaveBeenCalledWith({ target: { value: "gamma" } });

		await waitFor(() =>
			expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
		);
		fireEvent.click(trigger);
		const reopenedSearch = screen.getByRole("searchbox");
		fireEvent.change(reopenedSearch, { target: { value: "voice" } });
		fireEvent.keyDown(reopenedSearch, { key: "Escape" });
		await waitFor(() =>
			expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
		);

		fireEvent.click(trigger);
		expect(screen.getByRole("searchbox")).toHaveValue("");
	});
});
