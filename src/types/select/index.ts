import * as React from "react";

export interface SelectProps {
    selectOptions: any[];
    onChange?: Function;
    name?: string;
    value?: string;
    className: string;
    labelName: string;
}
