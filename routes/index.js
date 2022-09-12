const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

const User = require('../models/User');
const Layanan = require('../models/Layanan');

//REGISTER
router.post('/register', async (req, res) => {
  const { nama, username, password, telepon } = req.body;
  try {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //User instance or validation
    const newUser = new User({
      nama,
      username,
      password: hashedPassword,
      telepon,
    });

    //save user
    await newUser.save();

    //send response
    res.json({
      code: 200,
      status: 'success',
      message: 'Berhasil mendaftar',
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'internal server error',
      errors: err.errors,
    });
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    //find user
    const user = await User.findOne({
      where: { username },
    });
    if (!user)
      return res.status(401).json({
        code: 401,
        status: 'Unauthorized',
        message: 'wrong username or password',
      });

    //validate password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(401).json({
        code: 401,
        status: 'Unauthorized',
        message: 'wrong username or password',
      });

    //create and assign a token
    const token = jwt.sign({ _id: user.id, user: user.username }, process.env.TOKEN_SECRET);

    //served data
    const userData = {
      id: user.id,
      nama: user.nama,
      username: user.username,
      token,
    };

    //send response
    res.json({
      code: 200,
      status: 'success',
      data: userData,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'internal server error',
      errors: err,
    });
  }
});

//LAYANAN
router.post('/layanan', verifyToken, async (req, res) => {
  const { nama, unit, harga } = req.body;

  try {
    //Layanan instance or validation
    const newLayanan = new Layanan({
      nama,
      unit,
      harga,
      User_id: req.validUser._id,
    });

    //save layanan
    const layanan = await newLayanan.save();

    //served data
    const layananData = {
      id: layanan.id,
      nama: layanan.nama,
      unit: layanan.unit,
      harga: layanan.harga.toLocaleString('id-ID'),
      User_id: layanan.User_id,
    };

    //send response
    res.json({
      code: 200,
      status: 'success',
      data: layananData,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'internal server error',
      errors: err,
    });
  }
});

module.exports = router;
