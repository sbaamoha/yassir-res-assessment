import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

interface FilterBarProps {
  onFilterChange: (filters: Filters) => void;
  filters: Filters;
}

export interface Filters {
  status: string;
  businessDate: string;
  shift: string;
  area: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  filters,
}) => {
  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-4">
      <Select
        value={filters.status}
        onValueChange={(value) => handleFilterChange("status", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" defaultValue={""} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
          <SelectItem value="SEATED">Seated</SelectItem>
          <SelectItem value="CHECKED OUT">Checked Out</SelectItem>
          <SelectItem value="NOT CONFIRMED">Not Confirmed</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={filters.businessDate || ""}
        onChange={(e) => {
          handleFilterChange("businessDate", e.target.value);
        }}
      />

      <Select
        value={filters.shift}
        onValueChange={(value) => handleFilterChange("shift", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Shift" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BREAKFAST">Breakfast</SelectItem>
          <SelectItem value="LUNCH">Lunch</SelectItem>
          <SelectItem value="DINNER">Dinner</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="Area"
        value={filters.area || ""}
        onChange={(e) => handleFilterChange("area", e.target.value)}
        className="w-full"
      />
      <div>
        <Button
          size={"sm"}
          onClick={() => {
            onFilterChange({
              status: "",
              businessDate: "",
              shift: "",
              area: "",
            });
          }}
          className="col-span-2 bg-purple-700 hover:bg-purple-600 transition-colors"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};
