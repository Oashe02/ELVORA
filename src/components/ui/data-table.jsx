"use client";

import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

export function DataTable({
	data,
	columns,
	currentPage,
	totalPages,
	onPageChange,
}) {
	return (
		<div className="w-full">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<TableHead key={column.key}>{column.label}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						) : (
							data.map((item, i) => (
								<TableRow key={i}>
									{columns.map((column) => (
										<TableCell key={`${i}-${column.key}`}>
											{column.render ? column.render(item) : item[column.key]}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{totalPages > 1 && (
				<div className="flex items-center justify-end space-x-2 py-4">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(1)}
						disabled={currentPage === 1}
					>
						<ChevronsLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<span className="text-sm">
						Page {currentPage} of {totalPages}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(totalPages)}
						disabled={currentPage === totalPages}
					>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			)}
		</div>
	);
}
