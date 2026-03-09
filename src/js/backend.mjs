import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

// 1. Liste de tous les artistes triés par date de représentation
export async function allArtistesByDate() {
    try {
        const data = await pb.collection('artiste').getFullList({
            sort: 'date_presentation',
            expand: 'scene' // Pour récupérer les infos de la scène liée
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue [allArtistesByDate]', error);
        return [];
    }
}

// 2. Liste de toutes les scènes triées par nom
export async function allScenes() {
    try {
        const data = await pb.collection('scene').getFullList({
            sort: 'nom_scene',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue [allScenes]', error);
        return [];
    }
}

// 3. Liste de tous les artistes triés par ordre alphabétique
export async function allArtistesByNom() {
    try {
        const data = await pb.collection('artiste').getFullList({
            sort: 'nom_artiste',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue [allArtistesByNom]', error);
        return [];
    }
}

// 4. Infos d'un artiste par son ID
export async function oneArtisteById(id) {
    try {
        const data = await pb.collection('artiste').getOne(id, {
            expand: 'scene', // Récupère les détails de la scène en même temps
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue [oneArtisteById]', error);
        return null;
    }
}

// 5. Infos d'une scène par son ID
export async function oneSceneById(id) {
    try {
        const data = await pb.collection('scene').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue [oneSceneById]', error);
        return null;
    }
}

// 6. Tous les artistes se produisant sur une scène donnée par son ID
export async function artistesBySceneId(id) {
    try {
        const data = await pb.collection('artiste').getFullList({
            filter: `scene = "${id}"`,
            sort: 'date_presentation',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue [artistesBySceneId]', error);
        return [];
    }
}

// 7. Tous les artistes se produisant sur une scène donnée par son NOM
export async function artistesBySceneNom(nom) {
    try {
        const data = await pb.collection('artiste').getFullList({
            filter: `scene.nom_scene = "${nom}"`,
            sort: 'date_presentation',
            expand: 'scene'
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue [artistesBySceneNom]', error);
        return [];
    }
}

// 8. Ajouter ou modifier un artiste
export async function updateArtiste(id, data) {
    try {
        if (id) {
            return await pb.collection('artiste').update(id, data);
        } else {
            return await pb.collection('artiste').create(data);
        }
    } catch (error) {
        console.log('Erreur lors de la mise à jour/création [updateArtiste]', error);
        return null;
    }
}

// 9. Ajouter ou modifier une scène
export async function updateScene(id, data) {
    try {
        if (id) {
            return await pb.collection('scene').update(id, data);
        } else {
            return await pb.collection('scene').create(data);
        }
    } catch (error) {
        console.log('Erreur lors de la mise à jour/création [updateScene]', error);
        return null;
    }
}

// Helper pour les images
export function getImageUrl(record, filename) {
    if (!filename || !record) return "/placeholder.jpg";
    return pb.files.getURL(record, filename);
}

