import React, { useState, useEffect } from 'react';
import { Topbar } from '../components/Topbar';

const HealthPlan = () => {
    const [healthyLifeSuggestions, setHealthyLifeSuggestions] = useState([]);

    useEffect(() => {
        // Simulate fetching data or processing
        const fetchData = async () => {
            const healthyLife = [
                { id: 1, activity: 'Walking', duration: '30 minutes', frequency: 'Daily', done: false },
                { id: 2, activity: 'Jogging', duration: '20-30 minutes', frequency: '3-4 times a week', done: false },
                { id: 3, activity: 'Cycling', duration: '30-45 minutes', frequency: '3-4 times a week', done: false },
                { id: 4, activity: 'Yoga', duration: '30-60 minutes', frequency: 'Daily', done: false },
                { id: 5, activity: 'Strength Training', duration: '20-30 minutes', frequency: '2-3 times a week', done: false },
                { id: 6, activity: 'Hydration', recommendation: 'Drink at least 8 cups of water daily', done: false },
                { id: 7, activity: 'Sleep', recommendation: 'Get 7-9 hours of sleep nightly', done: false },
                { id: 8, activity: 'Stress Management', recommendation: 'Practice mindfulness or relaxation techniques', done: false },
            ];
            setHealthyLifeSuggestions(healthyLife);
        };

        fetchData();
    }, []);

    const toggleDone = (id) => {
        setHealthyLifeSuggestions(
            healthyLifeSuggestions.map(item =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    };

    return (
        <div className='flex flex-col'>
            <Topbar />
            <div className='flex flex-col p-5'>
                <h1 className='text-xl font-semibold text-blue-gray-900'>
                    Healthy Life Suggestions
                </h1>
                {healthyLifeSuggestions.length > 0 && (
                    <div className='mt-5'>
                        <div className='overflow-x-auto w-full'>
                            <table className='bg-white'>
                                <thead>
                                    <tr>
                                        <th className='py-2'>Activity</th>
                                        <th className='py-2'>Duration</th>
                                        <th className='py-2'>Frequency</th>
                                        <th className='py-2'>Recommendation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {healthyLifeSuggestions.map(item => (
                                        <tr key={item.id} className={item.done ? 'line-through' : ''} onClick={() => toggleDone(item.id)}>
                                            <td className='border px-4 py-2'>{item.activity}</td>
                                            <td className='border px-4 py-2'>{item.duration || '-'}</td>
                                            <td className='border px-4 py-2'>{item.frequency || '-'}</td>
                                            <td className='border px-4 py-2'>{item.recommendation || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthPlan;
