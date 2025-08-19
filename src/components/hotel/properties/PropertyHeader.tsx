import { Plus, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PropertyHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          Property Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your hotel properties and their performance
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="w-4 h-4" />
          Import
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
        <Button variant="gradient" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>
    </div>
  );
}