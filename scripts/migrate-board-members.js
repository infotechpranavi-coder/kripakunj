// This script updates existing board members to include the new fields
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/ngo-website';

async function migrateData() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('boardmembers');

        // Update all documents to add missing fields with default empty strings
        const result = await collection.updateMany(
            {
                $or: [
                    { bio: { $exists: false } },
                    { quote: { $exists: false } },
                    { linkedinUrl: { $exists: false } },
                    { email: { $exists: false } }
                ]
            },
            {
                $set: {
                    bio: '',
                    quote: '',
                    linkedinUrl: '',
                    email: ''
                }
            }
        );

        console.log(`Migration complete! Updated ${result.modifiedCount} documents.`);

        // Verify the update
        const sample = await collection.findOne({});
        console.log('\nSample document after migration:');
        console.log(JSON.stringify(sample, null, 2));

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrateData();
