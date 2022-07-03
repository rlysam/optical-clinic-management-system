const { response } = require("express");
const express = require("express");
const attendantModel = require("../models/Attendant");
const router = express.Router();

// READ
router.get("/attendants", async (request, response) => {
  const attendants = await attendantModel.find({is_archived: false});

  try {
    response.render("admin/attendants/attendants.ejs", {attendants});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/attendants/archives/", async (request, response) => {
  const attendants = await attendantModel.find({is_archived: true});

  try {
    response.render("admin/attendants/archives.ejs", {attendants});
  } catch (error) {
    response.status(500).send(error);
  }

});



// CREATE
router.post("/attendant", async (request, response) => {
  const attendant = new attendantModel(request.body);
  
  try {
    await attendant.save();
    response.redirect("attendants");
    
  } catch (error) {
    response.status(500).send(error);
  }
});

// BATCH ARCHIVE
router.patch("/attendant/archive", async (request, response) => {
  const archives = request.body;

  if(archives["archive-check"]) {
    for(let archive of archives["archive-check"]) {
      await attendantModel.findByIdAndUpdate(archive, {is_archived: true});
    }
  }

  response.redirect("/api/attendants");
});

// BATCH RESTORE
router.patch("/attendant/restore", async (request, response) => {
  const restores = request.body;

  if(restores["archive-check"]) {
    for(let restore of restores["archive-check"]) {
      await attendantModel.findByIdAndUpdate(restore, {is_archived: false});
    }
  }

  response.redirect("/api/attendants/archives");
});

// UPDATE
router.patch("/attendant/:id", async (request, response) => {

  try {    
    await attendantModel.findByIdAndUpdate(request.params.id, request.body);
   
    response.redirect("/api/attendants");
  } catch (error) {
    response.status(500).send(error);
  }


});

// DELETE
router.delete("/attendant/:id", async (request, response) => {
  try {
    const attendant = await attendantModel.findByIdAndDelete(request.params.id);

    if (!attendant) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;