import BlogPost from './blogpost.js'; // Update import statement for ES Modules

/*
* Create new blog post and add to the database
*/
export const createBlogPost = async (req, res) => {
  console.log("Request body is: ", req.body)
  const { title, date, content } = req.body;

  // Make sure the user has inputted all required fields
  if (!title || !date || !content) {
    return console.log({Error: 'All fields are required'});
  }

  // Make sure date is in the correct format
  if (!/^\d{2}-\d{2}-\d{2}$/.test(date)) {
    return console.log({ Error: 'Date must be in MM-DD-YY format' });
  }

  try {
    // Create new blog post object
    const newBlogPost = new BlogPost({ title, date, content });
    // Update the MongoDB database
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(400).json({ Error: 'Invalid request' });
  }
};

export const getBlogPosts = async (req, res) => {
  try {
    const query = { ...req.query };
    const blogposts = await BlogPost.find(query)
    console.log(blogposts)
    res.status(200).json(blogposts)
  } catch (error) {
    res.status(400).json({ Error: 'Invalid request' })
  }
};
