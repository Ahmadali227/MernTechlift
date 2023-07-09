// import { json } from 'express'
const transectionModel = require('../models/transectionModel')
const moment=require("moment")


const getAllTransection = async(req,res) => {

try {
  const {frequency,selectedDate,type}=req.body;
const transections= await transectionModel.find({
  ...(frequency !== "custom"
  ? {
      date: {
        $gt: moment().subtract(Number(frequency), "d").toDate(),
      },
    }
  : {
      date: {
        $gte: selectedDate[0],
        $lte: selectedDate[1],
      },
    }),
  userid:req.body.userid,

  ...(type !== "all" && { type }),

})
res.status(200).json(transections);

} catch (error) {
  console.log(error);
  res.status(500).json(error)
}
}
//////Edit Transection//////
const editTransection=async(req,res)=>{
  try {
   await transectionModel.findByIdAndUpdate({_id:req.body.transactionId},req.body.payload);
   res.status(200).send('Eidt Successfullty')
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
  }

  //////DELETE TRANSECTION////
const deleteTransection=async(req,res)=>{
  try {
    await transectionModel.findByIdAndDelete({_id:req.body.transactionId});
    res.status(200).send('Transection Deleted')

  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }

}




////add Transaction
const addTransection = async(req,res) => {
  try {
    const newTransection =  new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send('Transection added successfully')
  } catch (error) {
console.log(error);
res.status(500).json(error)
  }
}
module.exports = { getAllTransection,addTransection,editTransection,deleteTransection }