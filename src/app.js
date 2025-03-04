const express = require("express");
const app = express();
const { dbConnection } = require("./config/database");
const User = require("./models/user");
const { trusted } = require("mongoose");
app.use(express.json());

// creating a instance of the Models
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const createdUser = await user.save();
    res.send(createdUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting a only one user`
app.get("/user", async (req, res) => {
  try {
    const id = req.body._id;
    console.log(id);
    const user = await User.findById({ _id: id }).exec();
    if (user) {
      res.send(user);
      console.log("user Found => " + user);
    } else {
      console.log("User not found");
      res.status(404).send("User not found");
    }
    // res.send(user);
  } catch (error) {
    console.log("error while getting user by id");
    res.status(500).send("Server Error");
  }
});

// getting feed api  in devTinder
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (user) {
      res.send(user);
      console.log("feed => " + user);
    } else {
      console.log("feed not found");
      res.status(404).send("feed not found");
    }
  } catch (error) {
    console.log("error while getting user by id");
    res.status(500).send("Server Error");
  }
});

// find one an ddelete the user
app.delete("/delete", async (req, res) => {
  const userId = req.body._id;
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: userId },[ options.returnDocument='before']);
    if (deletedUser) {
      res.send(deletedUser);
      console.log("user deleted => " + deletedUser);
    } else {
      console.log("user not deleted  ");
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error + "issue while deleting user");
  }
});

// find the document and update 
app.patch('/user/update/:_id', async (req, res) => {
    const userId = req.params._id;
    console.log(userId)
    const data = req.body
    
    try {
        ALLOWED_UPDATE =["firstName",
            "lastName",
            "mobileNumber",
            "age",
            "gender"
        ]
        const isUpdateAllowed = Object.keys(data).every((k)=>{
            ALLOWED_UPDATE.includes(k)
        })
        if(!isUpdateAllowed){
            // throw new Error("updates not allowed...")
            // res.status(400).send("updates not allowed...")
            console.error("updates not allowed")
            

        }




        const updateUser = await User.findOneAndUpdate({_id:userId}, data, {
            returnDocument:'after',
            runValidators:true,
        });

      
        if(updateUser){
            res.send(updateUser);
            console.log("user updated => " + updateUser);
        }
        else{
            console.log("user not updated => ")
            res.status(404).send("not found and no documentation and updation requested");
        }

        
    } catch (error) {
        // console.log(error + " issue while updating user");
        res.status(404).send("please try again");
        
    }
})

// replacing the document
app.put('/user/replace', async (req, res) => {
    const userId = req.body._id;
    const data = req.body;
    console.log(data);
    console.log(userId);
    
    try {
        const replaceUser = await User.findOneAndReplace({_id: userId}, data)
        if(replaceUser){
            res.send(replaceUser);
            console.log("user replaced => " + replaceUser);
        }
        else{
            console.log("user not replaced => ")
            res.status(404).send("not found and no documentation and replacement requested");
        }


        
    } catch (error) {
        console.log(error + " issue while updating user");
        
    }
})





// dbConnections
dbConnection()
  .then(() => {
    console.log("connection established");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database" + err);
  });