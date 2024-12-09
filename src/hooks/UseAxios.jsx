import { useState, useCallback } from 'react';
import AxiosInstance from '../api/AxiosInstance'

const useAxios = (url, method = 'get', options = {}) => {

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
                    url,
                    method,
                    ...options,
                    ...requestData,
                });
                setData(response.data);
                setStatus(response.status)
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
                setStatus(err.status);
                setError(errorMessage);
            } finally {
                setLoading(false); 
            }
        },
        [url, method, options]
    );

    return { data, loading, error, status, fetchData }; 
};

export default useAxios;
