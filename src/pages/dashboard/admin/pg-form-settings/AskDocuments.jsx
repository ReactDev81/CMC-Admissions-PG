import { useContext, useEffect, useState, useCallback } from "react";
import ToggleButton from "../../../../components/forms/ToggleButton";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";

const AskDocument = () => {
    const [documentFields, setDocumentFields] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formState, setFormState] = useState({});

    const { userData } = useContext(UserContext);
    const BEARER_TOKEN = userData?.token;

    const { fetchData, status, data, loading } = useAxios(
        "/form/1/file-fields",
        "get",
        null,
        {
            headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        }
    );

    const { fetchData: updateFieldRequired } = useAxios(null, "post", {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    });

    // Memoize fetchData to avoid recreating it on every render
    const fetchDocumentFields = useCallback(async () => {
        // setIsLoading(true);
        try {
            await fetchData();
            if (status === 200) {
                setDocumentFields(data);
            }
        } catch (error) {
            setError(error.message || "Failed to fetch document fields");
        } finally {
            // setIsLoading(false);
        }
    }, [status]);

    useEffect(() => {
        fetchDocumentFields();
    }, [fetchDocumentFields]);

    // Initialize form state based on documentFields
    useEffect(() => {
        if (documentFields.length > 0) {
            const initialState = documentFields.reduce((acc, field) => {
                acc[field.name] = field.required;
                return acc;
            }, {});
            setFormState(initialState);
        }
    }, [documentFields]);

    const handleToggle = async (fieldId, fieldName, newValue) => {
        try {
            const url = `/form/1/fields/${fieldId}/required`;

            // Use the useAxios hook to make the POST request
            const response = await updateFieldRequired({
                url,
                data: { required: newValue },
            });

            // Update local state
            setFormState((prevState) => ({
                ...prevState,
                [fieldName]: newValue,
            }));

            console.log("Field updated successfully:", response.data);
        } catch (error) {
            console.error(
                "Error updating field required status:",
                error.message || error
            );

            if (error.response) {
                console.error("Error response data:", error.response.data);
            }
        }
    };

    if (error) {
        return (
            <div className="px-8 py-6 max-w-[650px] w-full bg-white-default rounded-lg shadow-flex">
                <p className="text-red-500">Error: {error}</p>
                <button
                    onClick={fetchDocumentFields}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <form>
            <div className="px-8 py-6 max-w-[650px] w-full bg-white-default rounded-lg shadow-flex">
                <h2 className="text-black-default mb-14 capitalize">Ask Documents</h2>

                {loading ? (
                    <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    documentFields.map((field) => (
                        // console.log(field);
                        <div
                            key={field.id}
                            className="flex items-center justify-between border-b"
                        >
                            <span className="text-lg font-normal text-black-300 px-1.5 py-3">
                                {field.label}
                            </span>
                            {/* <ToggleButton
                                id={field.name}
                                value={field.required}
                                onChange={() => handleToggle(field.id)}
                            /> */}
                            <ToggleButton
                                id={field.name}
                                value={formState[field.name]}
                                onChange={(newValue) =>
                                    handleToggle(field.id, field.name, newValue)
                                }
                            />
                        </div>
                    ))
                )}
            </div>
        </form>
    );
};

export default AskDocument;