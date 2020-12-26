
import axios from 'axios'

export const getLocation = async () => {
    const apiUrl = `https://geolocation-db.com/json/85249190-4601-11eb-9067-21b51bc8dee3`;
    try {
        const res =  await axios.get(apiUrl)
        return res.data;
    }
    catch (err) {
        return err
    }
}