import { createOneUserService } from '../service/usersServices.js'

export async function createUser(req, res) {
    try {
        const createNewUser = await createOneUserService(req.body);

        if (!createNewUser) {
            res.status(400).send({ message: "The input does not meet the required conditions / does not exist" })
        }

        res.status(200).send({ user: createNewUser })
    } catch (e) {
        res.status(500).send({ message: "the added not working", error: e.message })
    }
}