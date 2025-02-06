import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;



app.use(cors());


// Object array สำหรับข้อมูลสัตว์เลี้ยง
const pets = [
  {
    "petId": "PET001",
    "petName": "Max",
    "species": "Dog",
    "age": 5, // อายุสัตว์เลี้ยง
    "adopted": true, // สถานะการรับเลี้ยง
    "adoptionDate": "2020-08-15", // วันที่รับเลี้ยง
    "lastVetVisit": "2024-12-01", // วันที่เยี่ยมสัตว์เลี้ยงล่าสุด
  },
  {
    "petId": "PET002",
    "petName": "Mena",
    "species": "Cat",
    "age": 3,
    "adopted": false,
    "adoptionDate": null,
    "lastVetVisit": "2024-11-12",
  },
  {
    "petId": "PET003",
    "petName": "Candy",
    "species": "Dog",
    "age": 2,
    "adopted": true,
    "adoptionDate": "2023-05-22",
    "lastVetVisit": "2024-10-30",
  },
  {
    "petId": "PET004",
    "petName": "Luna",
    "species": "Rabbit",
    "age": 1,
    "adopted": true,
    "adoptionDate": "2024-02-05",
    "lastVetVisit": "2024-12-10",
  },
  {
    "petId": "PET005",
    "petName": "Bob",
    "species": "Bird",
    "age": 4,
    "adopted": false,
    "adoptionDate": null,
    "lastVetVisit": "2024-09-18",
  }
];

// สำหรับดึงข้อมูลสัตว์เลี้ยงทั้งหมด
app.get('/pets', (req, res) => {
  res.json(pets);
});

// สำหรับดึงข้อมูลสัตว์เลี้ยงตาม ID
app.get('/pets/:petId', (req, res) => {
  const petId = req.params.petId;
  const pet = pets.find(pet => pet.petId === petId);
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ message: "Pet not found" });
  }
});

// สำหรับเพิ่มข้อมูลสัตว์เลี้ยงใหม่
app.post('/pets', (req, res) => {
  const newPet = req.body;
  pets.push(newPet);
  res.status(201).json(newPet);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
