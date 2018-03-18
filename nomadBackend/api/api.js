module.exports = {
  defineApi: function(app){
    app.get('/api/v1/hello', function (req, res) {
      res.send('Hello');
    });

    app.get('/api/v1/world', function (req, res) {
      res.send('World');
    });

    app.post('/api/motion',function(req, res){
      console.log(req.body);
      res.send('200');
    })
  }
}