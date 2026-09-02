const mongoose=require('mongoose');
(async()=>{
 try{
  const uri=process.env.MONGODB_URI||'mongodb://localhost:27017/health_box_db';
  await mongoose.connect(uri);
  const col=mongoose.connection.db.collection('banners');
  await col.updateOne({_id: '6a882874693f0e4ece354080'}, {$set: {status: 'active'}});
  const banners=await col.find().toArray();
  console.log(JSON.stringify(banners,null,2));
  await mongoose.disconnect();
 }catch(e){console.error(e);process.exit(1);} 
})();
