"use client";

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
import { TablePagination } from "./TablePagination";
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
		accessorKey: "token0",
		header: "TOKEN 0",
		cell: ({ row }) => (
			<div className="capitalize">{row.original.token0.symbol}</div>
		),
	},
	{
		accessorKey: "token1",
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
	const [isLoading, setIsLoading] = useState("No results");

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
				setIsLoading("Loading Data...");
				uniswapData = await getTableData(UNISWAP_URL);
				pancakeswapData = await getTableData(PANCAKESWAP_URL);
				setData([...uniswapData, ...pancakeswapData] as DataType[]);
				setIsLoading("No results!");
				break;
			case "Uniswap":
				setIsLoading("Loading Data...");
				uniswapData = await getTableData(UNISWAP_URL);
				setData(uniswapData as DataType[]);
				setIsLoading("No results!");
				break;
			case "Pancakeswap":
				setIsLoading("Loading Data...");
				pancakeswapData = await getTableData(PANCAKESWAP_URL);
				setData(pancakeswapData as DataType[]);
				setIsLoading("No results!");
				break;
		}
	};

	useEffect(() => {
		fetchData();
	}, [displayType]);

	return (
		<>
			<nav className="z-20 h-[80px] bg-gray-700 flex items-center justify-between w-full">
				<ul className="text-white text-lg flex items-center justify-between w-[300px] mx-3">
					<li className="lg:hidden">
						<Button className="text-4xl flex text-white bg-none m-0 shadow-none" onClick={() => {
							setter((oldVal: any) => !oldVal);
						}}>
							<img src="./img/sidebar-small.png" width="32px" height="32px" className="min-w-8 min-h-8"/>
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
						value={(table.getColumn("txCount")?.getFilterValue() as string) ?? ""}
						onChange={(event) => table.getColumn("txCount")?.setFilterValue(event.target.value)}
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
									<TableCell colSpan={columns.length} className="h-24 text-center">
										{isLoading}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination table={table} />
			</div>
		</>
	);
}
