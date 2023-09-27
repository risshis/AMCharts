/**
 * This file was generated from AMCharts.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";

export type ColorEnumEnum = "Bar" | "Pie";

export interface AMChartsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    colorEnum: ColorEnumEnum;
    myBlockTitle?: DynamicValue<string>;
}

export interface AMChartsPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    colorEnum: ColorEnumEnum;
    myBlockTitle: string;
}
