var Link = new Schema({
    title    :String
  , url      :String
  , user     :Number
  , date     :Date
  , private  :Boolean
});

var Post = mongoose.model('Link', Link);
