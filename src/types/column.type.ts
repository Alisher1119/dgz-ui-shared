import type { CSSProperties, ReactNode } from "react";

export type ColumnType<TData> = {
  [K in keyof TData]: {
    key: string;
    dataIndex: K;
    name?: ReactNode;
    styles?: CSSProperties;
    access?: string[];
    hidden?: boolean;
    sortable?: boolean;
    render?: (value: TData[K], record: TData) => ReactNode;
  };
}[keyof TData];
