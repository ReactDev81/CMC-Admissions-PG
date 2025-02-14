import { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../api/AxiosInstance';
import { UserContext } from "../context/UserContext";
import { ApplicationContext } from "../context/ApplicationContext";

const useAxios = (initialUrl = null, method = 'get', options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const { setUserData } = useContext(UserContext);
    const { setApplicationInfo } = useContext(ApplicationContext);
    const navigate = useNavigate();

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
                const statusCode = err.response?.status || null;

                setStatus(statusCode);
                setError(errorMessage);

                if (statusCode === 401) {
                    navigate('/login'); 
                    setUserData({ token: '', role: null, userDetails: {}, permissions: {} })
                    setApplicationInfo({
                        application_id: null,
                        steps:{
                            step_personal: 'pending',
                            step_academic: 'pending',
                            step_documents: 'pending',
                            step_payment: 'pending',
                        }
                    })
                }
            } finally {
                setLoading(false);
            }
        },
        [initialUrl, method, options]
    );

    return { data, loading, error, status, fetchData };
};

export default useAxios;
