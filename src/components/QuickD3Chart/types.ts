export type QuickD3ChartDataItem = {
    key: string | number;
    value: number;
    // will be used in tooltip
    label?: string;
    /**
     * Label that will be displayed on top
     */
    labelOnTop?: string;
    // will be used to display derived information like % of population
    additionalValue?: string;
    /**
     * fill color for this item
     */
    fill?: string;
};

export type QuickD3ChartData = QuickD3ChartDataItem[];

export type Dimension = {
    height: number;
    width: number;
};

export type Margin = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export type SvgContainerData = {
    svg: SVGSVGElement;
    rootGroup: SVGGElement;
    margin: Margin;
    dimension: Dimension;
};
