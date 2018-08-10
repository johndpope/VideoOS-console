module.exports = {
  'POST /video/login': (req, res) => {
    const { password, username } = req.body;
    res.send({
      status: 200,
      token: 'fee00df0e0eo0e0e0e',
      resCode: '00'
    })
  },
}