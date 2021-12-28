import * as React from "react";

export interface CheckboxProps {
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: boolean;
}