"use client";

import * as React from "react";
import { useEffect } from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { DataTablePagination } from "./tablePagination";
import { Label } from "../ui/label";
import { getTableData } from "@/lib/fetchData";

export type DataType = {
	token0: {
		symbol: string;
	};
	token1: {
		symbol: string;
	};
	txCount: string;
	volumeUSD: string;
	liquidity: string;
	totalValueLockedUSD: string;
};

export const columns: ColumnDef<DataType>[] = [
	{
		accessorKey: "token0.symbol",
		header: "TOKEN 0",
		cell: ({ row }) => (
			<div className="capitalize">{row.original.token0.symbol}</div>
		),
	},
	{
		accessorKey: "token1.symbol",
		header: "TOKEN 1",
		cell: ({ row }) => (
			<div className="capitalize">{row.original.token1.symbol}</div>
		),
	},
	{
		accessorKey: "totalValueLockedUSD",
		header: "AMOUNT",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("totalValueLockedUSD")}</div>
		),
	},
	{
		accessorKey: "txCount",
		header: "TXN",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("txCount")}</div>
		),
	},
	{
		accessorKey: "volumeUSD",
		header: "VOLUME",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("volumeUSD")}</div>
		),
	},
	{
		accessorKey: "liquidity",
		header: "LIQUIDITY",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("liquidity")}</div>
		),
	},
];

const UNISWAP_URL = "uniswap/uniswap-v3";
const PANCAKESWAP_URL = "pancakeswap/exchange-v3-eth";

export function MyTable({ setter }: any) {
	const [displayType, setDisplayType] = useState("All");
	const [data, setData] = useState<DataType[]>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	const fetchData = async () => {
		let uniswapData : any, pancakeswapData: any;
		switch (displayType) {
			case "All":
				uniswapData = await getTableData(UNISWAP_URL);
				pancakeswapData = await getTableData(PANCAKESWAP_URL);
				setData([...uniswapData, ...pancakeswapData] as DataType[]);
				break;
			case "Uniswap":
				uniswapData = await getTableData(UNISWAP_URL);
				setData(uniswapData as DataType[]);
				break;
			case "Pancakeswap":
				pancakeswapData = await getTableData(PANCAKESWAP_URL);
				setData(pancakeswapData as DataType[]);
				break;
		}
	};

	useEffect(() => {
		fetchData();
	}, [displayType]);

	return (
		<div>
			<nav className="z-20 h-[80px] bg-gray-700 flex items-center justify-between w-full">
				<ul className="text-white text-lg flex items-center justify-between w-[300px] mx-3">
					<li className="lg:hidden">
						<Button className="text-4xl flex text-white bg-none m-0 shadow-none" onClick={() => {
							setter((oldVal: any) => !oldVal);
						}}>
							<svg viewBox="0 0 48 48" width="30px" height="30px">
								<linearGradient id="EIPc0qTNCX0EujYwtxKaXa" x1="12.066" x2="34.891" y1=".066" y2="22.891" gradientUnits="userSpaceOnUse">
									<stop offset=".237" stopColor="#3bc9f3" />
									<stop offset=".85" stopColor="#1591d8" />
								</linearGradient>
								<path fill="url(#EIPc0qTNCX0EujYwtxKaXa)" d="M43,15H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,14.1,44.1,15,43,15z" />
								<linearGradient id="EIPc0qTNCX0EujYwtxKaXb" x1="12.066" x2="34.891" y1="12.066" y2="34.891" gradientUnits="userSpaceOnUse">
									<stop offset=".237" stopColor="#3bc9f3" />
									<stop offset=".85" stopColor="#1591d8" />
								</linearGradient>
								<path fill="url(#EIPc0qTNCX0EujYwtxKaXb)" d="M43,27H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,26.1,44.1,27,43,27z" />
								<linearGradient
									id="EIPc0qTNCX0EujYwtxKaXc"
									x1="12.066"
									x2="34.891"
									y1="24.066"
									y2="46.891"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset=".237" stopColor="#3bc9f3" />
									<stop offset=".85" stopColor="#1591d8" />
								</linearGradient>
								<path
									fill="url(#EIPc0qTNCX0EujYwtxKaXc)"
									d="M43,39H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,38.1,44.1,39,43,39z"
								/>
							</svg>
						</Button>
					</li>
					<li className="ml-2 lg:ml-8 cursor-pointer" onClick={() => setDisplayType("All")}>
						All
					</li>
					<li className="cursor-pointer" onClick={() => setDisplayType("Uniswap")}>
						Uniswap
					</li>
					<li className="cursor-pointer" onClick={() => setDisplayType("Pancakeswap")}>
						Pancakeswap
					</li>
				</ul>
			</nav>
			<div className="w-[95%] mx-auto my-auto rounded-xl px-5 py-3 bg-white">
				<div className="flex items-center py-4 justify-between">
					<Label className="text-3xl font-bold ml-7">{displayType}</Label>
					<Input className="max-w-sm" placeholder="Filter by TXN"
						value={(table.getColumn("token0.symbol")?.getFilterValue() as string) ?? ""}
						onChange={(event) => table.getColumn("token0.symbol")?.setFilterValue(event.target.value)}
					/>
				</div>
				<div className="rounded-md border mb-5">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id} className="border border-gray-200 text-center">
												{header.isPlaceholder
													? null
													: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody className="text-center">
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className="border border-gray-200">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										Loading Data...
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<DataTablePagination table={table} />
			</div>
		</div>
	);
}
