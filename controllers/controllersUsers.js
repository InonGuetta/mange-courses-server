import { createOneUserService, updateOneUserService, getAllUsersService, deleteOneUserService, searchUsersService } from '../services/servicesUsers.js'
// חיפוש חכם לפי שם (לפי שם חלקי לא תלוי רשויות )
export async function searchUsers(req, res) {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).send({ message: 'Missing search parameter: name' });
        }
        const users = await searchUsersService(name);
        return res.status(200).send({ users });
    } catch (e) {
        return res.status(500).send({ message: 'search failed', err: e.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const deletedUser = await deleteOneUserService(req.params.id);
        if (!deletedUser) {
            return res.status(404).send({ message: 'user not found' });
        }
        return res.status(200).send({ message: 'user deleted', deletedUser });
    } catch (e) {
        return res.status(500).send({ message: 'delete failed', err: e.message });
    }
}

export async function getAllUsers(res) {
    try {
        const getAllUsers = await getAllUsersService();
        if (!getAllUsers) {
            res.status(404).send({ message: "the users not founds" })
        }

        res.status(200).send({ users: getAllUsers })
    } catch (e) {
        return res(500).send({ message: "Error get all users", error: e.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const createNewUser = await createOneUserService(req.body);

        if (!createNewUser) {
            res.status(400).send({ message: "The input does not meet the required conditions / does not exist" });
        }

        res.status(200).send({ user: createNewUser });
    } catch (e) {
        res.status(500).send({ message: "the added not working", error: e.message });
    }
};

export async function updateUser(req, res) {
    try {
        const updateOneUser = await updateOneUserService(req.params.id, req.body);
        if (updateOneUser === null) {
            res.status(404).send({ message: 'user not found' });
        }

        res.status(200).send({ message: "update success", newUser: updateOneUser })
    } catch (e) {
        res.status(500).send({ message: "update failed", err: e.message })
    }
}