export interface SearchHistoryItem {
  id: number;
  text: string;
}

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  name: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "url"
    | "number"
    | "date"
    | string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
