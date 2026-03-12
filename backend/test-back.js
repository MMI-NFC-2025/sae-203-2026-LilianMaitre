// Exemples simples pour verifier que les commandes PocketBase fonctionnent
import { pb, allArtistesByDate, allScenes, getImageUrl } from './backend.mjs';

// Health check
try {
    const res = pb.health?.check ? await pb.health.check() : await pb.send('/api/health', { method: 'GET' });
    console.log('Health check OK:', JSON.stringify(res, null, 2));
} catch (e) {
    console.error('Health check KO', e);
}

// Lecture des scenes
try {
    const scenes = await allScenes();
    console.log('Scenes:', JSON.stringify(scenes, null, 2));
} catch (e) {
    console.error('Lecture scenes KO', e);
}

// Lecture des artistes tries par date
try {
    const artistes = await allArtistesByDate();
    console.log('Artistes:', JSON.stringify(artistes, null, 2));
} catch (e) {
    console.error('Lecture artistes KO', e);
}

// Construction d une URL de fichier pour un artiste ayant une photo
try {
    const artistes = await allArtistesByDate();
    const firstWithPhoto = artistes.find((a) => a?.photo_artiste?.length || a?.photo_artiste);
    if (firstWithPhoto) {
        const filename = Array.isArray(firstWithPhoto.photo_artiste) ? firstWithPhoto.photo_artiste[0] : firstWithPhoto.photo_artiste;
        const url = getImageUrl(firstWithPhoto, filename);
        console.log('URL photo:', url);
    } else {
        console.log('Aucun artiste avec photo pour tester l URL');
    }
} catch (e) {
    console.error('Generation URL KO', e);
}
