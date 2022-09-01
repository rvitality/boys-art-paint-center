import { useEffect } from "react";
import { useState } from "react";

const useSendRequest = requestFn => {
    const [pending, setPending] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await requestFn();
                if (response) {
                    console.log(response);
                    setData(response);
                }
            } catch (err) {
                setError(err.message);
                return;
            }
        };

        sendRequest();

        setPending(false);
    }, [pending]);

    return { data, error, pending };
};

export default useSendRequest;
