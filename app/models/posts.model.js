module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define("posts", {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    category:{
      type: Sequelize.STRING
    },
    keywords: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    likedUsers: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    },
    authorId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
  });


  return Posts;
};
