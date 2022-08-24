const Music = require("../models/Music");
// const { createWriteStream } = require("fs");

module.exports = {
  Query: {
    async getMusicsFE() {
      try {
        const musics = await Music.find().sort({ createdAt: -1 });
        return musics;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMusics() {
      try {
        const musics = await Music.find().sort({ createdAt: -1 });
        return musics;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMusicById(_, { id }) {
      try {
        const music = await Music.findById(id);
        return music;
      } catch (err) {
        return null;
      }
    },
  },
  Mutation: {
    // uploadFile: async (_, { file }) => {
    //   const { createReadStream, filename } = await file;
    //   await new Promise((res) =>
    //     createReadStream()
    //       .pipe(createWriteStream(path.join(__dirname, "../images", filename)))
    //       .on("close", res)
    //   );

    //   files.push(filename);

    //   return filename;
    // },
    async createMusic(
      _,
      { musicInput: { name, singer, thumbnailUrl, status, category, fileMp3 } }
    ) {
      const newMusic = new Music({
        name,
        singer,
        thumbnailUrl,
        status,
        category,
        fileMp3,
        createdAt: new Date().toISOString(),
      });

      const music = await newMusic.save();

      return music;
    },
    // async updateMusic(_, { id, name, singer, thumbnailUrl, status, category }) {
    //   const foundMusic = await Music.findById(id);
    //   if (!foundMusic) {
    //     let updatedUser;
    //     try {
    //       updatedUser = await Music.findByIdAndUpdate(
    //         id,
    //         { $push: { musics: newMusic } },
    //         { new: true, runValidators: true }
    //       );
    //     } catch {
    //       return next(
    //         createError(500, "User could not be updated. Please try again")
    //       );
    //     }

    //     // * ... and send back the updated array of albums to the frontend
    //     res.status(201).json(updatedUser.musics);

    //     // If the new album is already in the user's "albums" array...
    //     // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    //   } else {
    //     next(createError(409, "The album already exists in your collection!"));
    //   }
    // },

    //Start
    // async updateMusic(_, { id, name, singer, thumbnailUrl, status, category }) {
    //   const music = await Music.findById(id);
    //   if (!music) {
    //     return "error";
    //   }

    //   const modifier = { name, singer, thumbnailUrl, status, category };

    //   // if (name !== music.name) {
    //   //   modifier.name = name;
    //   // }

    //   const editedMusic = await Music.findOneAndUpdate(
    //     { _id: id },
    //     { $set: modifier }
    //   );

    //   return editedMusic;
    // },
    //// end

    async updateMusic(_, { id, name, singer, thumbnailUrl, status, category }) {
      try {
        const music = await Music.findById(id);
        if (music) {
          music.name = name;
          music.singer = singer;
          music.thumbnailUrl = thumbnailUrl;
          music.status = status;
          music.category = category;
          await music.save();
          return music;
        }

        // await music
        //   .findOneAndUpdate(
        //     { id: music.id },
        //     { name: music.name },
        //     { singer: music.singer },
        //     { thumbnailUrl: music.thumbnailUrl },
        //     { status: music.status },
        //     { category: music.category }
        //   )
        //   .save();
        // await music.save();
        return music;
      } catch (e) {
        return "error";
      }
    },
    async deleteMusic(_, { musicId }) {
      try {
        const music = await Music.findById(musicId);
        if (music) {
          const data = await Music.findByIdAndDelete(musicId);
          return "success";
        }
      } catch (e) {
        return "error";
      }
    },
  },
};
