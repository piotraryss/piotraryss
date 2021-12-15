import { NextApiRequest, NextApiResponse } from 'next'
import AuthorizeCredentials from './credentials'

const Action = () => async (req: NextApiRequest, res: NextApiResponse) => {

    // Ustal parametry query
    let {
        query: { action },
    } = req

    // Ustal akcję
    action = action[0] ? action[0] : [];

    // Błąd - to API obsługuje odwołania jedynie typu POST
    if (String(req.method).toLowerCase() !== 'post') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return
    }

    // Akcja SIGNIN - logowanie się użytkownika
    else if(action == "credentials") {
        AuthorizeCredentials(req, res)
    }
    
    // Brak zdefiniowanej sekcji dla wywołanej akcji
    else {
        res.status(200).json({error: "UNKNOWN_ACTION"});
    }
}

export default Action
