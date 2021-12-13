// Import dependencies
const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// data
const hewan = [
    {id: 1, nama: 'Snowy', spesies: 'kucing'},
    {id: 2, nama: 'Blacki', spesies: 'anjing'},
    {id: 3, nama: 'Molly', spesies: 'kucing'},
    {id: 4, nama: 'Milo', spesies: 'kelinci'},
    {id: 5, nama: 'Rere', spesies: 'kucing'},
]


// Menambahkan Middleware Post Checker
const postChecker = (req, res, next) => {
    const spesies = req.body.spesies
    const error = "Spesies not valid"
    if (spesies != 'kucing' && spesies != 'kelinci' && spesies != 'anjing') {
      return res.status(400).json({error})
    }
    else {
        next()
    }
}


// Get all hewan
app.get("/hewan", (req, res) => {
    const message = "berhasil mengambil data"
    res.status(200);
    res.json({message, hewan});
});


//Get hewan by id
app.get("/hewan/:id", (req, res) => {
    const cariHewan = hewan.find(pet => pet.id === Number(req.params.id))
    if (cariHewan) {
      const message = "berhasil mengambil data"
      res.json({message, cariHewan})
    } else {
      res.status(400).send("gagal mendapatkan data")
    }
});

// Tambah data hewan
app.post("/hewan", postChecker ,(req, res) => {
    const {nama, spesies} = req.body
    const message = "berhasil menambah data"
    const newHewan = {
      id : hewan.length + 1,
      nama : nama,
      spesies : spesies
    };
    hewan.push(newHewan);
    res.status(201)
    res.json({message, hewan});
});

// Update data hewan by id
app.put("/hewan/:id", postChecker ,(req, res) => {
    const cariHewan = hewan.find(pet => pet.id === Number(req.params.id))
    const {nama, spesies} = req.body
    if (cariHewan) {
        const message = "berhasil mengubah data"
        cariHewan.nama = nama
        cariHewan.spesies = spesies
        res.status(201)
        res.json({message, cariHewan});
    } else {
      res.status(400).send("gagal mendapatkan data")
    }
});  

// Delete hewan by id
app.delete("/hewan/:id", (req, res) => {
    const cariHewan = hewan.find(pet => pet.id === Number(req.params.id))
    if (cariHewan) {
        const message = "berhasil menghapus data"
        hewan.splice(Number(req.params.id) - 1, 1)
        res.json({message, hewan});
    } else {
      res.status(400).send("gagal mendapatkan data")
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log("server is listening on port ",port);
    //No 2 . Menambahkan logger
    console.log("this is logger")
});

