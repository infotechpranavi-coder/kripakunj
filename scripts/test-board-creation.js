// Test script to verify board member creation
const testBoardCreation = async () => {
    const formData = new FormData();
    formData.append('name', 'Test Member');
    formData.append('designation', 'Test Designation');
    formData.append('bio', 'This is a test bio to verify data persistence');
    formData.append('quote', 'Test quote for verification');
    formData.append('linkedinUrl', 'https://linkedin.com/test');
    formData.append('email', 'test@example.com');
    formData.append('order', '0');

    // Create a fake image file
    const blob = new Blob(['fake image data'], { type: 'image/jpeg' });
    const file = new File([blob], 'test.jpg', { type: 'image/jpeg' });
    formData.append('image', file);

    try {
        console.log('Sending request to create board member...');
        const response = await fetch('http://localhost:3000/api/board', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log('Response:', JSON.stringify(result, null, 2));

        if (result.success) {
            console.log('\n✓ Member created successfully!');
            console.log('Checking if all fields were saved...');

            // Fetch the member back
            const getResponse = await fetch('http://localhost:3000/api/board');
            const getResult = await getResponse.json();

            const createdMember = getResult.data.find(m => m.name === 'Test Member');
            if (createdMember) {
                console.log('\n✓ Found the created member:');
                console.log('Name:', createdMember.name);
                console.log('Designation:', createdMember.designation);
                console.log('Bio:', createdMember.bio);
                console.log('Quote:', createdMember.quote);
                console.log('LinkedIn:', createdMember.linkedinUrl);
                console.log('Email:', createdMember.email);

                // Check if all fields are present
                const allFieldsPresent =
                    createdMember.bio === 'This is a test bio to verify data persistence' &&
                    createdMember.quote === 'Test quote for verification' &&
                    createdMember.linkedinUrl === 'https://linkedin.com/test' &&
                    createdMember.email === 'test@example.com';

                if (allFieldsPresent) {
                    console.log('\n✓✓✓ ALL FIELDS SAVED CORRECTLY! ✓✓✓');
                } else {
                    console.log('\n✗ Some fields are missing or incorrect');
                }
            } else {
                console.log('\n✗ Could not find the created member');
            }
        } else {
            console.log('\n✗ Failed to create member:', result.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

testBoardCreation();
