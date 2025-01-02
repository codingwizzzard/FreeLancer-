import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const EarningsOverview = () => {
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [monthlyEarnings, setMonthlyEarnings] = useState([]);

    useEffect(() => {
        const fetchEarningsOverview = async () => {
            try {
                const { data } = await API.get('http://localhost:5000/api/payments/earnings-overview');
                setTotalEarnings(data.totalEarnings);

                const formattedData = Object.keys(data.monthlyEarnings).map((month) => ({
                    month,
                    earnings: data.monthlyEarnings[month],
                }));

                setMonthlyEarnings(formattedData);
            } catch (error) {
                toast.error('Failed to fetch earnings overview.');
            }
        };
        fetchEarningsOverview();
    }, []);

    return (
        <div className="container">
            <h3 className="my-4">Earnings Overview</h3>
            <div className="card p-3 mb-4">
                <h4>Total Earnings: ₹{totalEarnings}</h4>
            </div>
            <div className="card p-3">
                {monthlyEarnings.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={monthlyEarnings}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="earnings" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-center p-4">
                        <p>No earnings data to display</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EarningsOverview;
