const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);
app.post('/register',async(req,res)=>{
      const{ username, email, password }= req.body;
      const hashedPassword = await bcrypt.hash(password,10);
      const user=new User({ username, email, password: hashedPassword});
      await user.save();
      res.json({ message: 'User registration succesful'});

});
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ error: 'Pasword is invalid' });

  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
  res.json({ token });
});

app.get('/profile', (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, 'your_jwt_secret');
  res.json({ message: `Welcome user ${decoded.userId}` });
});

app.listen(3000, () => console.log('Server running on port 3000'));
