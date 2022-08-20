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
            const music = await Music.findById(id);
            if (!music) {
                return "error";
            }
        
            const modifier = { name, singer, thumbnailUrl,status, category};
        
            // if (name !== music.name) {
            //   modifier.name = name;
            // }
        
            const editedMusic = await Music.findOneAndUpdate(
              { _id: id },
              { $set: modifier },
            );
        
            return editedMusic;
        },

        // async updateMusic (_, { id, name, singer, thumbnailUrl, status, category }) {
            
        //     try {
        //         const music = await Music.findById(id);
        //         if (name !== music.name) {
        //             music.name = name;
        //         }
        //         if (singer !== music.singer) {
        //             music.singer = singer;
        //         }
        //         if (thumbnailUrl !== music.thumbnailUrl) {
        //             music.thumbnailUrl = thumbnailUrl;
        //         }
        //         if (status !== music.status) {
        //             music.status = status;
        //         }
        //         if (category !== music.category) {
        //             music.category = category;
        //         }
        //         await music.save();
        //         return music
        //     } catch (e) {
        //        return "error";
        //     }
        // },
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
