class MarvelService {
    constructor() {
        this._apiBase = 'https://marvel-server-zeta.vercel.app/';
        this._apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    }

    async getResource(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        return res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource(`${this._apiBase}characters?${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const all = await this.getAllCharacters();
        const char = all.find(c => c.id === id);
        if (!char) throw new Error(`Character ${id} not found`);
        return char;
    }

    _transformCharacter(char) {
        return {
            id: char.id,
            name: char.name,
            description: char.description?.slice(0, 210) || 'No description',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls?.[0]?.url || '#',
            wiki: char.urls?.[1]?.url || '#',
            comics: char.comics?.items || []
        };
    }
}
export default MarvelService;