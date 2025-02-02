import { DropdownOption } from "../../shared/ui/dropdown-menu/types";

export interface typePopupFormFilterProps {
  onClose: () => void;
  filters: {
    category: DropdownOption[];
    brand: DropdownOption[];
    style: DropdownOption[];
    color: DropdownOption[];
    price: DropdownOption[];
  };
  onFilterChange: (filterType: string, value: string[]) => void;
}
