const NotificationSchema = new mongoose.Schema({
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['message', 'comment', 'like', 'event', 'connection', 'achievement'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    relatedEntity: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'entityModel'
    },
    entityModel: {
      type: String,
      enum: ['User', 'Post', 'Message', 'Event']
    },
    isRead: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });