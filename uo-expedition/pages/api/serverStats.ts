import axios from 'axios';

export default async (req: any, res: any) => {
    const { username, password } = req.body;

    try {
        const response = await axios.post('http://8.210.214.69:3030/server-stats', {
            username,
            password,
        });

        res.status(200).json({ success: true, data: response.data.data });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ success: false, error: error.message });
    }
};
