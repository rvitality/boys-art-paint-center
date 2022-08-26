import React, { useState, useMemo } from "react";

import { HiArrowSmDown } from "react-icons/hi";

import "./SortAbleTableHeader.styles.scss";

const SortAbleTableHeader = ({ dataArr, typeToSort, onSort, className }) => {
    const [isAsc, setIsAsc] = useState(false);

    const sortedDataAsc = useMemo(() => {
        const selectedType = typeToSort.toLowerCase();

        const compare = (a, b) => {
            if (a[selectedType] < b[selectedType]) {
                return -1;
            }
            if (a[selectedType] > b[selectedType]) {
                return 1;
            }
            return 0;
        };

        const dataCopy = [...dataArr];
        return dataCopy.sort(compare);
    }, [dataArr, typeToSort]);

    const sortedDataDesc = useMemo(() => {
        // ! sort doesnt trigger rerender
        // ! there is no change detected since the reference is the same
        const sortedDataAscCopy = [...sortedDataAsc]; // ! that's why this line is needed. You have to create a new array
        return sortedDataAscCopy.reverse();
    }, [sortedDataAsc]);

    const sortHandler = () => {
        if (!isAsc) {
            setIsAsc(true);
            onSort(sortedDataAsc);
        } else {
            setIsAsc(false);
            onSort(sortedDataDesc);
        }
    };

    return (
        <th className={`sort-able ${className}`} onClick={sortHandler}>
            <span style={{ textTransform: "capitalize" }}>{typeToSort}</span>
            <HiArrowSmDown className={`${isAsc ? "rotate" : ""}`} />
        </th>
    );
};

export default SortAbleTableHeader;
