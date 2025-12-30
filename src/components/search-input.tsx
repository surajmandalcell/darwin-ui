"use client";

import React from "react";
import { Input } from "./input";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function SearchInput(props: SearchInputProps) {
	return <Input variant="search" {...props} />;
}
