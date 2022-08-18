const Music = require('../models/Music');

module.exports = {
    Query: {
        async getMusics() {
            try{
                const musics = await Music.find().sort({ createdAt: -1 });
                return musics;
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation:{
        async createMusic (_, { musicInput: { name, singer, thumbnailUrl, status, category }  }) {
         
            const newMusic = new Music({
                name,
                singer,
                thumbnailUrl,
                status,
                category,
                createdAt: new Date().toISOString()
            });

            const music = await newMusic.save();

            return music;
        }
    }
}
