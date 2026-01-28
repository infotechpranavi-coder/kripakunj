// This script adds sample data to the first board member for testing
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/ngo-website';

async function addSampleData() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('boardmembers');

        // Get the first member
        const firstMember = await collection.findOne({});

        if (!firstMember) {
            console.log('No board members found!');
            process.exit(1);
        }

        // Update with sample data
        const result = await collection.updateOne(
            { _id: firstMember._id },
            {
                $set: {
                    bio: 'A visionary leader with over 15 years of experience in social development and community empowerment. Dedicated to creating sustainable change through innovative programs and strategic partnerships.',
                    quote: 'Service to humanity is the highest form of worship',
                    linkedinUrl: 'https://www.linkedin.com/in/sample',
                    email: 'contact@kripakunj.org'
                }
            }
        );

        console.log(`Updated ${result.modifiedCount} document with sample data.`);

        // Show the updated document
        const updated = await collection.findOne({ _id: firstMember._id });
        console.log('\nUpdated document:');
        console.log(JSON.stringify(updated, null, 2));

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Update failed:', error);
        process.exit(1);
    }
}

addSampleData();
