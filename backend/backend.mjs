// @ts-nocheck
import PocketBase from 'pocketbase';
export const pb = new PocketBase('https://lumimix.lilian-maitre.fr/');

// AJOUTE BIEN "export" ICI
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

// Helper unique pour construire les URLs PocketBase
export function getImageUrl(record, filename) {
    if (!record || !filename) return "/placeholder.jpg";
    try {
        return pb.files.getURL(record, filename);
    } catch (error) {
        console.error("Erreur getImageUrl", error);
        return "/placeholder.jpg";
    }
}

export async function allScenes() {
    try {
        // C'est ici : "scene" au lieu de "scenes"
        const records = await pb.collection('scene').getFullList();
        return records;
    } catch (error) {
        console.error("Erreur collection :", error);
        return [];
    }
}