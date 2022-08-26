import React, { useState, useMemo } from "react";

import { HiArrowSmDown } from "react-icons/hi";

import "./SortAbleTableHeader.styles.scss";

const SortAbleTableHeader = ({ dataArr, typeToSort, onSort, className, children }) => {
    const [isAsc, setIsAsc] = useState(false);

    const sortedDataAsc = useMemo(() => {
        const compare = (a, b) => {
            const x = typeToSort === "cart" ? a["cart"].length : a[typeToSort];
            const y = typeToSort === "cart" ? b["cart"].length : b[typeToSort];

            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }

            return 0;

            // return x > y ? -1 : x < y ? 1 : 0;
        };

        const dataCopy = [...dataArr];
        return dataCopy.sort(compare);
    }, [dataArr, typeToSort]);

    const sortedDataDesc = useMemo(() => {
        // ! sort doesnt trigger rerender
        //  there is no change detected since the reference is the same
        const sortedDataAscCopy = [...sortedDataAsc]; //  that's why this line is needed. You have to create a new array
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
            <span style={{ textTransform: "capitalize" }}>{children}</span>
            <HiArrowSmDown className={`${isAsc ? "rotate" : ""}`} />
        </th>
    );
};

export default SortAbleTableHeader;
