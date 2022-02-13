import {
    breakpoints,
    labels,
} from "src/components/Media/Breakpoints/breakpointValues";
import { createContext } from "react";

const breakpointsArray = breakpoints;
const labelsArray = labels;
//test
const breakpointMap = breakpointsArray.reduce((arr, size, index) => {
    return [
        ...arr,
        {
            label: labelsArray[index],
            size,
        },
    ];
}, []);

const findBreakpoint = (label, breakpointMap) =>
    breakpointMap.find((bp) => bp.label === label);

const getBreakpointValue = (label) =>
    typeof label === "object"
        ? label.size
        : findBreakpoint(label, breakpointMap).size;

const getMaxBreakpointValue = (label) => {
    if (label === null) {
        return;
    }
    /**
     * We do this to prevent collions between breakpoints.
     * https://www.w3.org/TR/mediaqueries-4/#range-context
     */
    const breakpointValue = getBreakpointValue(label).toString();
    const postfix = breakpointValue.match(/[a-zA-Z]+/) || "";
    const value = parseInt(breakpointValue, 10);

    return `${value - (postfix === "em" ? 0.01 : 1)}${postfix}`;
};

const getNextBreakpoint = (breakpoint) => {
    const index = breakpointMap.indexOf(
        findBreakpoint(breakpoint, breakpointMap)
    );
    return index !== breakpointMap.length - 1 ? breakpointMap[index + 1] : null;
};

const above = breakpointMap.reduce((obj, bp) => {
    return {
        ...obj,
        [bp.label]: `@media (min-width: ${bp.size})`,
    };
}, {});

const below = breakpointMap.reduce((obj, bp) => {
    return {
        ...obj,
        [bp.label]: `@media (max-width: ${getMaxBreakpointValue(bp.label)})`,
    };
}, {});

const media = ["hover"].reduce((obj) => {
    if (typeof document !== "undefined" && document.documentMode) {
        return obj;
    }

    return {
        ...obj,
        hover: `@media (hover: hover)`,
    };
}, {});

const between = breakpointMap.reduce((obj, bp, breakpointMapIndex) => {
    /**
     * Create an array of min - max labels for each breakpoint
     * (xs-md, xs-lg etc)
     */
    const breakpointLabels = labelsArray
        .reduce((arr, label, breakpointLabelIndex) => {
            return [
                ...arr,
                bp.label === label
                    ? null
                    : breakpointMapIndex < breakpointLabelIndex
                    ? {
                          name: `${bp.label}-${label}`,
                          from: bp.label,
                          to: label,
                      }
                    : null,
            ];
        }, [])
        .filter((bp) => bp !== null);

    /**
     * Create an array of CSS media queries from the breakpoint labels
     */
    const mediaQueries = breakpointLabels.reduce((obj, bpName) => {
        return {
            ...obj,
            [bpName.name]: `@media (min-width: ${
                bp.size
            }) and (max-width: ${getMaxBreakpointValue(
                breakpointMap.find((bp) => bp.label === bpName.to).label
            )})`,
        };
    }, {});

    return {
        ...obj,
        ...mediaQueries,
    };
}, {});

export const Breakpoint = createContext({
    breakpointLabel: "sm",
    breakpointIndex: labelsArray.indexOf("sm"),
});

// Used in SSR
const BreakpointCollector = Breakpoint.Provider;

export {
    BreakpointCollector,
    findBreakpoint,
    getBreakpointValue,
    getMaxBreakpointValue,
    getNextBreakpoint,
    above,
    between,
    below,
    media,
};
