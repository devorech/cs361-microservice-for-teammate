import mongoose from 'mongoose';

const blogpostSchema = new mongoose.Schema({
  title: {type: String, required: true},
  date: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2}-\d{2}-\d{2}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid date format. Use MM-DD-YY.`,
    },
  },
  content: { type: String, required: true }
}); 

const BlogPost = mongoose.model("blogpost", blogpostSchema)

export default BlogPost;
