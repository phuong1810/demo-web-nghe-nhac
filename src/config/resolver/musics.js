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
        },
        async getMusicById(_, { id }) {
            try{
                const music = await Music.findById(id);
                return music;
            } catch (err) {
                return null;
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
        },
        async updateMusic (_, { id, name, singer, thumbnailUrl, status, category }) {
            
            try {
                const music = await Music.findById(id);
                if (music) {
                    music.name = name;
                    music.singer = singer;
                    music.thumbnailUrl = thumbnailUrl;
                    music.status = status;
                    music.category = category;
                    await music.save();
                    return music
                }
            } catch (e) {
               return "error";
            }
        },
        async deleteMusic(_, {musicId}){
            try {
                const music = await Music.findById(musicId);
                if (music) {
                    const data = await Music.findByIdAndDelete(musicId);
                    return "success";
                }
            } catch (e) {
               return "error";
            }
        }
    }
}
