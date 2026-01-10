// Mock API functions
export const updateEmail = async (newEmail) => {
    console.log(`Updating email to ${newEmail}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
};

export const updatePassword = async (currentPassword, newPassword) => {
    console.log('Updating password');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
};