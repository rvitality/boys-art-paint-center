import { useState } from "react";

const useSort = (data, typeToSort) => {
    const [dataToDisplay, setDataToDisplay] = useState(data || []);
    const [sortResult, setSortResult] = useState({ isAsc: false, typeToSort: "" });

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

    // wont work, wont cause rerender
    // there is no change detected since the reference is the same
    // setDataToDisplay(currProducts => currProducts.sort(compare))

    if (!sortResult.isAsc) {
        setSortResult({ isAsc: true, typeToSort });
        setDataToDisplay(prevState => {
            const arr = [...prevState];
            return arr.sort(compare);
        });
    } else {
        setSortResult({ isAsc: false, typeToSort });
        setDataToDisplay(prevState => {
            const arr = [...prevState];
            return arr.reverse();
        });
    }

    return { dataToDisplay, isAsc: sortResult.isAsc, typeToSort: sortResult.typeToSort };
};

export default useSort;
