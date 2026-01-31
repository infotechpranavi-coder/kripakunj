import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Campaign from '@/models/Campaign';
import Volunteer from '@/models/Volunteer';
import Donation from '@/models/Donation';
import Event from '@/models/Event';

export async function GET() {
    try {
        await dbConnect();

        // 1. Get Summary Stats
        const totalCampaigns = await Campaign.countDocuments();
        const totalVolunteers = await Volunteer.countDocuments();
        const upcomingEvents = await Event.countDocuments({ status: 'upcoming' });

        // Sum of all completed donations
        const donations = await Donation.find({ status: 'completed' });
        const totalFundsRaised = donations.reduce((sum, donation) => sum + donation.amount, 0);

        // 2. Recent Activities (combining latest donations and volunteers)
        const recentDonations = await Donation.find({ status: 'completed' })
            .sort({ createdAt: -1 })
            .limit(3);

        const recentVolunteers = await Volunteer.find({})
            .sort({ createdAt: -1 })
            .limit(2);

        const recentActivities = [
            ...recentDonations.map(d => ({
                id: `d-${d._id}`,
                user: `${d.firstName} ${d.lastName}`,
                action: `donated ₹${d.amount.toLocaleString()}`,
                time: getTimeAgo(d.createdAt),
                type: 'donation',
                timestamp: d.createdAt.getTime()
            })),
            ...recentVolunteers.map(v => ({
                id: `v-${v._id}`,
                user: `${v.firstName} ${v.lastName}`,
                action: `joined as volunteer`,
                time: getTimeAgo(v.createdAt),
                type: 'volunteer',
                timestamp: v.createdAt.getTime()
            }))
        ].sort((a, b) => b.timestamp - a.timestamp);

        // 3. Campaign Performance (Bar Chart)
        const campaigns = await Campaign.find({}).limit(6);
        const campaignPerformance = campaigns.map(c => ({
            name: c.title.substring(0, 10),
            raised: c.raisedAmount,
            goal: c.goalAmount
        }));

        // 4. Volunteer Distribution (Pie Chart)
        const educationCount = await Volunteer.countDocuments({ areaOfInterest: 'education' });
        const healthCount = await Volunteer.countDocuments({ areaOfInterest: 'healthcare' });
        const envCount = await Volunteer.countDocuments({ areaOfInterest: 'environment' });
        const communityCount = await Volunteer.countDocuments({ areaOfInterest: 'community' });

        const volunteerDistribution = [
            { name: 'Education', value: educationCount || 10, color: '#3b82f6' },
            { name: 'Healthcare', value: healthCount || 8, color: '#ef4444' },
            { name: 'Environment', value: envCount || 5, color: '#10b981' },
            { name: 'Community', value: communityCount || 7, color: '#8b5cf6' },
        ];

        // 5. Top Campaigns
        const topCampaigns = await Campaign.find({})
            .sort({ raisedAmount: -1 })
            .limit(4);

        const topCampaignsData = topCampaigns.map(c => ({
            id: c._id,
            name: c.title,
            raised: c.raisedAmount,
            goal: c.goalAmount,
            progress: Math.min(Math.round((c.raisedAmount / c.goalAmount) * 100), 100)
        }));

        return NextResponse.json({
            success: true,
            data: {
                summary: [
                    { title: 'Total Campaigns', value: totalCampaigns.toString(), change: '+0%', icon: 'Heart', color: 'text-red-500' },
                    { title: 'Active Volunteers', value: totalVolunteers.toLocaleString(), change: '+0%', icon: 'Users', color: 'text-blue-500' },
                    { title: 'Funds Raised', value: `₹${(totalFundsRaised / 100000).toFixed(1)}L`, change: '+0%', icon: 'TrendingUp', color: 'text-green-500' },
                    { title: 'Upcoming Events', value: upcomingEvents.toString(), change: '+0%', icon: 'Calendar', color: 'text-purple-500' },
                ],
                recentActivities,
                campaignPerformance,
                volunteerDistribution,
                topCampaigns: topCampaignsData
            }
        });

    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch dashboard stats' }, { status: 500 });
    }
}

function getTimeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}
