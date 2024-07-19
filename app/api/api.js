export const uploadImages = async (formData) => {
    try {
        const response = await fetch('http://192.168.29.232:5000/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to upload images');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
