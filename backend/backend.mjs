// @ts-nocheck
import PocketBase from 'pocketbase';
export const pb = new PocketBase('https://lumimix.lilian-maitre.fr/');

export async function allArtistesByDate() {
    try {
        const data = await pb.collection('artiste').getFullList({
            sort: 'date_presentation',
            expand: 'scene'
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue [allArtistesByDate]', error);
        return [];
    }
}

export function getImageUrl(record, filename) {
    if (!record || !filename) return "/placeholder.jpg";
    try {
        return pb.files.getURL(record, filename);
    } catch (error) {
        console.error("Erreur getImageUrl", error);
        return "/placeholder.jpg";
    }
}

export async function artisteById(id) {
    try {
        const record = await pb.collection('artiste').getOne(id, {
            expand: 'scene'
        });
        return record;
    } catch (error) {
        console.error('Erreur [artisteById]', error);
        return null;
    }
}

export async function allScenes() {
    try {
        const records = await pb.collection('scene').getFullList();
        return records;
    } catch (error) {
        console.error("Erreur collection :", error);
        return [];
    }
}

export async function sceneById(id) {
    try {
        const record = await pb.collection('scene').getOne(id);
        return record;
    } catch (error) {
        console.error('Erreur [sceneById]', error);
        return null;
    }
}


