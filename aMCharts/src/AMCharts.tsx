import { Component, ReactNode, createElement } from "react";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import { AMChartsContainerProps } from "../typings/AMChartsProps";
import "./ui/AMCharts.css";
export default class AMCharts extends Component<AMChartsContainerProps> {
    chartID: string = "";
    componentDidMount(): void {
        const chartvalue = this.props.myBlockTitle?.value || "";
        if (chartvalue != "") {
            this.displayChart();
        }
    }
    componentDidUpdate(): void {
        this.displayChart();
    }
    displayChart = () => {
        if (this.props.colorEnum == "Bar") {
            const { chartID } = this;
            let root = am5.Root.new(chartID);
            root.setThemes([am5themes_Animated.new(root)]);
            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true
                })
            );
            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);
            let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
            xRenderer.labels.template.setAll({
                rotation: -90,
                centerY: am5.p50,
                centerX: am5.p100,
                paddingRight: 15
            });
            xRenderer.grid.template.setAll({
                location: 1
            });
            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    maxDeviation: 0.3,
                    categoryField: "name",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                })
            );
            let yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    maxDeviation: 0.3,
                    renderer: am5xy.AxisRendererY.new(root, {
                        strokeOpacity: 0.1
                    })
                })
            );
            let series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "Series 1",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value",
                    sequencedInterpolation: true,
                    categoryXField: "name",
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "{valueY}"
                    })
                })
            );
            series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });

            let textTemplateValue = this.props.myBlockTitle?.value || "";
            textTemplateValue = textTemplateValue.replaceAll("{{", "{");
            textTemplateValue = textTemplateValue.replaceAll("}}", "}");
            let data;
            try {
                data = JSON.parse(textTemplateValue);
            } catch (error) {
                data = [];
                console.error("Error parsing data:", error);
            }
            xAxis.data.setAll(data);
            series.data.setAll(data);
            series.appear(1000);
            chart.appear(1000, 100);
        } else {
            const { chartID } = this;
            let root = am5.Root.new(chartID);

            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([am5themes_Animated.new(root)]);

            // Create chart
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
            let chart = root.container.children.push(
                am5percent.PieChart.new(root, {
                    radius: am5.percent(90),
                    innerRadius: am5.percent(50),
                    layout: root.horizontalLayout
                })
            );

            // Create series
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
            let series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    name: "Series",
                    valueField: "value",
                    categoryField: "name"
                })
            );

            // Set data
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
            let textTemplateValue = this.props.myBlockTitle?.value || "";
            textTemplateValue = textTemplateValue.replaceAll("{{", "{");
            textTemplateValue = textTemplateValue.replaceAll("}}", "}");
            let data;
            try {
                data = JSON.parse(textTemplateValue);
            } catch (error) {
                data = [];
                console.error("Error parsing data:", error);
            }

            series.data.setAll(data);

            // Disabling labels and ticks
            series.labels.template.set("visible", false);
            series.ticks.template.set("visible", false);

            // Adding gradients
            series.slices.template.set("strokeOpacity", 0);
            series.slices.template.set(
                "fillGradient",
                am5.RadialGradient.new(root, {
                    stops: [
                        {
                            brighten: -0.8
                        },
                        {
                            brighten: -0.8
                        },
                        {
                            brighten: -0.5
                        },
                        {
                            brighten: 0
                        },
                        {
                            brighten: -0.5
                        }
                    ]
                })
            );

            // Create legend
            // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
            let legend = chart.children.push(
                am5.Legend.new(root, {
                    centerY: am5.percent(50),
                    y: am5.percent(50),
                    layout: root.verticalLayout
                })
            );
            // set value labels align to right
            legend.valueLabels.template.setAll({ textAlign: "right" });
            // set width and max width of labels
            legend.labels.template.setAll({
                maxWidth: 140,
                width: 140,
                oversizedBehavior: "wrap"
            });

            legend.data.setAll(series.dataItems);

            // Play initial series animation
            // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
            series.appear(1000, 100);
        }
    };
    render(): ReactNode {
        this.chartID = "pie" + Math.floor(Math.random() * 100000);
        return <div className="chart-container" id={this.chartID} />;
    }
}
