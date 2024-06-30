import React, { useState } from 'react';
import { Topbar } from '../components/Topbar';
import { Input, Button, Select, Option } from '@material-tailwind/react';
import QRCode from 'qrcode.react';
import { ScaleLoader } from 'react-spinners';

const Dashboard = () => {
    const [patientDetails, setPatientDetails] = useState({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
    });

    const [loading, setLoading] = useState(false);
    const [healthSuggestions, setHealthSuggestions] = useState('');
    const [healthyLifeSuggestions, setHealthyLifeSuggestions] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails({
            ...patientDetails,
            [name]: value,
        });
    };

    const handleGenderChange = (value) => {
        setPatientDetails({
            ...patientDetails,
            gender: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading state
        generateHealthSuggestions(patientDetails);
    };

    const generateHealthSuggestions = (details) => {
        const { height, weight } = details;
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);

        let suggestions = `Your BMI is ${bmi}. `;
        if (bmi < 18.5) {
            suggestions += 'You are underweight. Consider a diet rich in calories and nutrients. ';
        } else if (bmi < 24.9) {
            suggestions += 'You have a normal weight. Keep maintaining a balanced diet and regular exercise. ';
        } else if (bmi < 29.9) {
            suggestions += 'You are overweight. Consider a diet plan and regular exercise to lose weight. ';
        } else {
            suggestions += 'You are obese. It is recommended to consult with a healthcare provider for a personalized plan. ';
        }

        suggestions += 'Regular exercise is crucial for maintaining good health. Stay hydrated by drinking at least 8 cups of water daily. Remember to get sufficient sleep and manage stress through mindfulness or relaxation techniques. ';

        setTimeout(() => {
            setHealthSuggestions(suggestions);

            const healthyLife = [
                { activity: 'Walking', duration: '30 minutes', frequency: 'Daily' },
                { activity: 'Jogging', duration: '20-30 minutes', frequency: '3-4 times a week' },
                { activity: 'Cycling', duration: '30-45 minutes', frequency: '3-4 times a week' },
                { activity: 'Yoga', duration: '30-60 minutes', frequency: 'Daily' },
                { activity: 'Strength Training', duration: '20-30 minutes', frequency: '2-3 times a week' },
                { activity: 'Hydration', recommendation: 'Drink at least 8 cups of water daily' },
                { activity: 'Sleep', recommendation: 'Get 7-9 hours of sleep nightly' },
                { activity: 'Stress Management', recommendation: 'Practice mindfulness or relaxation techniques' },
            ];

            setHealthyLifeSuggestions(healthyLife);

            setLoading(false); // End loading state
        }, 1500); // Simulate delay for demonstration (1.5 seconds)
    };

    return (
        <div className='flex flex-col'>
            <Topbar />
            <div className='flex lg:flex-row flex-col'>
                <div className='flex flex-col w-full p-5'>
                    <h1 className='text-xl font-semibold text-blue-gray-900'>
                        User's Health Consultation
                    </h1>
                    <form className='mt-5' onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <Input
                                type='text'
                                name='name'
                                label='Name'
                                value={patientDetails.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <Input
                                type='number'
                                name='age'
                                label='Age'
                                value={patientDetails.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <Select
                                label="Gender"
                                value={patientDetails.gender}
                                onChange={handleGenderChange}
                                required
                            >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </div>
                        <div className='mb-4'>
                            <Input
                                type='number'
                                name='height'
                                label='Height (cm)'
                                value={patientDetails.height}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <Input
                                type='number'
                                name='weight'
                                label='Weight (kg)'
                                value={patientDetails.weight}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <Input
                                type='text'
                                name='issue'
                                label='Issue you usually face'
                                required
                            />
                        </div>
                        <Button type='submit' disabled={loading}>
                            {loading ? <ScaleLoader color='#ffffff' loading={loading} height={16} width={6} radius={2} margin={3} />
                                : "Submit"}
                        </Button>
                    </form>

                    {healthSuggestions && (
                        <div className='mt-5'>
                            <h2 className='text-lg font-semibold'>Analizying Result:</h2>
                            <p>{healthSuggestions}</p>
                        </div>
                    )}
                    {healthyLifeSuggestions.length > 0 && (
                        <div className='mt-5 w-screen'>
                            <h2 className='text-lg font-semibold'>Healthy Life Suggestions:</h2>
                            <div className='overflow-x-auto w-11/12'>
                                <table className=' bg-white'>
                                    <thead>
                                        <tr>
                                            <th className='py-2'>Activity</th>
                                            <th className='py-2'>Duration</th>
                                            <th className='py-2'>Frequency</th>
                                            <th className='py-2'>Recommendation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {healthyLifeSuggestions.map((item, index) => (
                                            <tr key={index}>
                                                <td className='border px-4 py-2'>{item.activity}</td>
                                                <td className='border px-4 py-2'>{item.duration || '-'}</td>
                                                <td className='border px-4 py-2'>{item.frequency || '-'}</td>
                                                <td className='border px-4 py-2'>{item.recommendation || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    Add this to your health plan
                                </button>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
