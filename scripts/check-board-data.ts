import dbConnect from './lib/db';
import BoardMember from './models/BoardMember';

async function checkData() {
    await dbConnect();
    const members = await BoardMember.find({}).lean();
    console.log(JSON.stringify(members, null, 2));
    process.exit(0);
}

checkData();
