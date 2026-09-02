const mongoose=require('mongoose');
(async()=>{
 try{
  const uri=process.env.MONGODB_URI||'mongodb://localhost:27017/health_box_db';
  await mongoose.connect(uri);
  const bannersCol=mongoose.connection.db.collection('banners');
  const doctorsCol=mongoose.connection.db.collection('doctors');

  // Reuse existing image paths if available
  const sampleBanner = await bannersCol.findOne() || {};
  const sampleDoctor = await doctorsCol.findOne() || {};

  const bannerRes = await bannersCol.insertOne({
    desktopImage: sampleBanner.desktopImage || '/uploads/banners/placeholder.png',
    mobileImage: sampleBanner.mobileImage || '/uploads/banners/placeholder.png',
    heading: 'TEST BANNER 12345',
    subheading: 'Automated test banner',
    buttonText: 'Learn More',
    buttonUrl: '#',
    displayOrder: 0,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const doctorRes = await doctorsCol.insertOne({
    name: 'TEST DOCTOR 12345',
    photo: sampleDoctor.photo || '/uploads/doctors/placeholder.jpg',
    gender: 'other',
    phone: '9999999999',
    email: 'testdoctor@example.com',
    specialization: 'Test Spec',
    department: 'Test Dept',
    qualification: 'MBBS',
    experience: '1',
    registrationNumber: 'TEST123',
    bio: 'Test doctor for verification',
    availability: { days: ['Mon'], startTime: '09:00', endTime: '17:00', consultationTiming: '9-5' },
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log('Inserted bannerId=', bannerRes.insertedId.toString());
  console.log('Inserted doctorId=', doctorRes.insertedId.toString());

  await mongoose.disconnect();
 }catch(e){console.error(e);process.exit(1);} 
})();
