module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
      comment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'userId'
        }
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'posts',
          key: 'id'
        }
      },
    });
    

    return Comments;
  };
  