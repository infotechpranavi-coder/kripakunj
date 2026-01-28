import dbConnect from './lib/db';
import BoardMember from './models/BoardMember';

async function testPersistence() {
    await dbConnect();
    const testMember = {
        name: "Test Member",
        designation: "Test Designation",
        imageUrl: "https://example.com/image.jpg",
        bio: "This is a test bio",
        quote: "This is a test quote",
        linkedinUrl: "https://linkedin.com/test",
        email: "test@example.com",
        order: 1
    };

    try {
        const created = await BoardMember.create(testMember);
        console.log("Created successfully:");
        console.log(JSON.stringify(created, null, 2));

        const fetched = await BoardMember.findById(created._id).lean();
        console.log("\nFetched from DB:");
        console.log(JSON.stringify(fetched, null, 2));

        await BoardMember.findByIdAndDelete(created._id);
        console.log("\nDeleted test member.");
    } catch (error) {
        console.error("Persistence failed:", error);
    }
    process.exit(0);
}

testPersistence();
