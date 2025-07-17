import { useState, useRef } from "react";
import { Upload, Loader2, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import ImportTemplateGenerator from "./ImportTemplateGenerator";

export default function GenericImportButton({
  endpoint = "/generic-import",
  entityName,
  buttonText = "Import",
  variant = "outline",
  acceptedFormats = ".csv,.json",
  templateUrl,
  onImportComplete,
  showTemplateGenerator = false,
  entityType,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [importResults, setImportResults] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setImportResults(null);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to import.");
      return;
    }

    const fileType = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!acceptedFormats.includes(`.${fileType}`)) {
      toast.error(
        `Only ${acceptedFormats.replace(/\./g, "")} files are supported.`
      );
      return;
    }

    setIsImporting(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("entity", entityName.toLowerCase());

      const response = await axiosInstance.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const results = response.data;
      setImportResults(results);

      if (results.failed > 0) {
        toast.error(
          `Imported: ${results.imported}, Updated: ${results.updated}, Failed: ${results.failed}`
        );
      } else {
        toast.success(
          `Imported: ${results.imported}, Updated: ${results.updated}`
        );
      }

      if (onImportComplete) onImportComplete();
    } catch (err) {
      console.error("Import error:", err);
      toast.error(
        err.response?.data?.error || `Error importing ${entityName.toLowerCase()}.`
      );
    } finally {
      setIsImporting(false);
    }
  };

  const resetImport = () => {
    setSelectedFile(null);
    setImportResults(null);
    setActiveTab("upload");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const closeDialog = () => {
    setIsOpen(false);
    setTimeout(resetImport, 300);
  };

  return (
    <>
      <Button variant={variant} onClick={() => setIsOpen(true)}>
        <Upload className="mr-2 h-4 w-4" /> {buttonText}
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import {entityName}</DialogTitle>
            <DialogDescription>
              Upload a file to import {entityName.toLowerCase()}.
            </DialogDescription>
          </DialogHeader>
          {!importResults ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <div className="space-y-4">
                  <Label>Select File</Label>
                  <Input
                    type="file"
                    accept={acceptedFormats}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  {selectedFile && (
                    <div className="flex items-center gap-2">
                      <FileText /> {selectedFile.name} (
                      {(selectedFile.size / 1024).toFixed(1)} KB)
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="instructions">
                <div className="space-y-4">
                  <p>Files must be CSV or JSON with matching fields.</p>
                  {templateUrl && (
                    <Button variant="outline" asChild>
                      <a href={templateUrl} download>
                        <FileText className="mr-2" /> Download Template
                      </a>
                    </Button>
                  )}
                  {showTemplateGenerator && entityType && (
                    <ImportTemplateGenerator entityType={entityType} />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-4">
              <AlertCircle
                className={
                  importResults.failed > 0 ? "text-amber-500" : "text-green-500"
                }
              />
              <p>Total: {importResults.total}</p>
              <p>Imported: {importResults.imported}</p>
              <p>Updated: {importResults.updated}</p>
              <p>Failed: {importResults.failed}</p>
              {importResults.failed > 0 && (
                <ul className="text-destructive">
                  {importResults.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <DialogFooter>
            {!importResults ? (
              <>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button
                  onClick={handleImport}
                  disabled={!selectedFile || isImporting}
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Importing...
                    </>
                  ) : (
                    `Import ${entityName}`
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={resetImport}>Import Another</Button>
                <Button onClick={closeDialog}>Close</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}