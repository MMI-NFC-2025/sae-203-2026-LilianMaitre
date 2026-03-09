// @ts-nocheck
import PocketBase from 'pocketbase';
export const pb = new PocketBase('http://127.0.0.1:8090');

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

// Fais de même pour getImageUrl (Garde une seule version propre)
export function getImageUrl(record, filename) {
    if (!record || !filename) return "/placeholder.jpg";
    return pb.files.getURL(record, filename);
}