import { useState, useCallback } from 'react';
import AxiosInstance from '../api/AxiosInstance';

const useAxios = (initialUrl = null, method = 'get', options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const fetchData = useCallback(
        async (requestData = {}) => {
            setLoading(true);
            setError(null);

            try {
                const response = await AxiosInstance.request({
                    url: requestData.url || initialUrl, // Prioritize requestData.url over initialUrl
                    method,
                    ...options,
                    ...requestData, 
                });

                setData(response.data);
                setStatus(response.status);
                return response; // Ensure fetchData returns response
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
                setStatus(err.response?.status || null);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [initialUrl, method, options]
    );

    return { data, loading, error, status, fetchData };
};

export default useAxios;
