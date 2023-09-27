import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { AMChartsPreviewProps } from "../typings/AMChartsProps";

export class preview extends Component<AMChartsPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.myBlockTitle} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/AMCharts.css");
}
