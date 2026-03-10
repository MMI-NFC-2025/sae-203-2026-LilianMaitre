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

export async function allScenes() {
    try {
        const records = await pb.collection('scene').getFullList({
            sort: 'nom_scene', // Optionnel : pour les trier par nom
        });
        return records;
    } catch (error) {
        console.error("Erreur lors de la récupération des scènes :", error);
        return [];
    }
}

export function getImageUrl(record, filename) {
    // On construit l'URL de base de ton PocketBase local
    const pbUrl = "http://127.0.0.1:8090";
    return `${pbUrl}/api/files/${record.collectionId}/${record.id}/${filename}`;
}