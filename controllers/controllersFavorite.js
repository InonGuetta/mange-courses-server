import { addFavoriteOneService, removeFavoriteOneService, getAllFavoritesByUserService, getAllFavoriteService } from '../services/servicesFavorite.js';


export const getAllFavorite = async (req, res) => {
    try {
        const favorites = await getAllFavoriteService();
        if(!favorites){
            res.status(404).send({message: "the favorites not found"})
        }
        res.status(200).send({ favorites})
    } catch (e) {
        res.status(500).send({message: "Error get all favorite"})
    }
}

// קוד 001 אין לגעת 
// export const addFavorite = async (req, res) => {
//     try {
//         const userId = req.user?.id || req.body.userId || req.params.userId;
//         const courseId = req.body.courseId || req.params.id;
//         if (!userId || !courseId) {
//             return res.status(400).json({ message: "userId and courseId are required" });
//         }
//         const favorite = await addFavoriteOneService(userId, courseId);
//         if (!favorite) {
//             return res.status(409).json({ message: "Favorite already exists or failed to add" });
//         }
//         res.status(201).json(favorite);
//     } catch (e) {
//         res.status(500).send({ message: "Error added course to favorite" })
//     }
// }

export const addFavorite = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId || req.params.userId;
        const courseId = req.body.courseId || req.params.id;
        if (!userId || !courseId) {
            return res.status(400).json({ message: "userId and courseId are required" });
        }
        const favorite = await addFavoriteOneService(userId, courseId);
        if (!favorite) {
            return res.status(409).json({ message: "Favorite already exists or failed to add" });
        }
        res.status(201).json(favorite);
    } catch (e) {
        res.status(500).send({ message: "Error added course to favorite" })
    }
}

export const removeFavorite = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "id is required" });
        }
        const removed = await removeFavoriteOneService(id);
        if (!removed) {
            return res.status(404).json({ message: "Favorite not found" });
        }
        res.status(200).json({ message: "Favorite removed successfully" });
    } catch (e) {
        res.status(500).send({ message: "Error remove course from favorite" })
    }
}

export const getAllFavoriteByUser = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId || req.query.userId || req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const favorites = await getAllFavoritesByUserService(userId);
        res.status(200).json(favorites);
    } catch (e) {
        res.status(500).send({ message: "Error get all courses favorites" })
    }
}