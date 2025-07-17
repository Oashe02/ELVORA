import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { importConfig } from "@/utils/import-config";

export default function ImportTemplateGenerator({
	entityType,
	variant = "outline",
}) {
	const generateTemplate = () => {
		const config = importConfig[entityType];
		if (!config) {
			console.error(
				`No import configuration found for entity type: ${entityType}`,
			);
			return;
		}

		// Build a template object with all non-ignored fields
		const template = {};
		Object.entries(config.fields).forEach(([name, fieldConfig]) => {
			if (!fieldConfig.ignore) {
				template[name] = getPlaceholder(name, fieldConfig);
			}
		});

		// JSON content
		const jsonContent = JSON.stringify([template], null, 2);
		// CSV content
		const headers = Object.keys(template).join(",");
		const values = Object.values(template)
			.map((v) => formatCsvValue(v))
			.join(",");
		const csvContent = `${headers}\n${values}`;

		// Trigger downloads
		downloadFile(
			`${entityType}-template.json`,
			jsonContent,
			"application/json",
		);
		downloadFile(`${entityType}-template.csv`, csvContent, "text/csv");
	};

	const getPlaceholder = (fieldName, fieldConfig) => {
		if (fieldConfig.default !== undefined) return fieldConfig.default;
		switch (fieldConfig.type) {
			case "number":
				return 0;
			case "boolean":
				return false;
			case "date":
				return new Date().toISOString();
			case "array":
				return [];
			case "object":
				return {};
			default:
				if (importConfig[entityType]?.identifierFields.includes(fieldName)) {
					return `[unique-${fieldName}]`;
				}
				return `[${fieldName}]`;
		}
	};

	const formatCsvValue = (value) => {
		if (value == null) return "";
		if (typeof value === "object") {
			return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
		}
		const str = String(value);
		if (str.includes(",") || str.includes('"')) {
			return `"${str.replace(/"/g, '""')}"`;
		}
		return str;
	};

	const downloadFile = (filename, content, type) => {
		const blob = new Blob([content], { type });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<Button variant={variant} onClick={generateTemplate}>
			<FileDown className="mr-2 h-4 w-4" />
			Download Import Template
		</Button>
	);
}
