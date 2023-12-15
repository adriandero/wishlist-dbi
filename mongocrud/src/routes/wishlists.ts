const express = require('express')
import { Response, Request, NextFunction } from 'express';
const Wishlist = require("../models/WishlistModel.ts");
import { WishlistModel } from '../models/WishlistModel';
import mongoose, {AnyExpression, ConnectOptions} from 'mongoose'
const router = express.Router()

router.use(function(req:Request, res:Response, next:NextFunction) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });

// Post Method
router.post('/post', async function(req:Request, res:Response, next:NextFunction) {
    const wishlist = new Wishlist({
        year: req.body.year,
        child: req.body.child,
        items: req.body.items
    })

    try{
        const newWishlist = await wishlist.save() //saves it to the databse
        res.status(201).json(newWishlist) // once saved -> tell user
    } catch(err:any) {
        res.status(400).json({message: err.message})
    }
 })


//Get all Method
router.get('/getAll', async function(req:Request, res:Response, next:NextFunction) {
    try {
        const wishlists = await Wishlist.find()
        res.json(wishlists)
    } catch(err:any) {
        res.status(500).json({message: err.message})
    }
})

//Get by ID Method
router.get('/:id', getWishlist, function(req:Request, res:Response, next:NextFunction) {
    res.send(res.wishlist)
})

//update by ID Method
router.patch('/patch/:id', getWishlist, async function(req: Request, res: Response, next: NextFunction) {
    if (req.body.year != null) {
      res.wishlist!.year = req.body.year;
    }
    if (req.body.child != null) {
      res.wishlist!.child = req.body.child;
    }
    if (req.body.items != null) {
        res.wishlist!.items = req.body.items;
    }
  
    try {
      const updatedWishlist = await res.wishlist!.save();
      res.json(updatedWishlist);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

//Delete by ID Method
router.delete('/:id', getWishlist, async function(req:Request, res:Response, next:NextFunction) {
    try {
        await res.wishlist?.deleteOne()
        res.json({message: 'Wishlist delete successful'})
    } catch (err:any) {
        res.status(500).json({message: err.message})
    }
})


// Extend the Response type to include a 'wishlist' property
declare global {
    namespace Express {
      interface Response {
        wishlist?: WishlistModel; 
      }
    }
  }



async function getWishlist(req:Request, res:Response, next:NextFunction) {
    let wishlist
    try {
        wishlist = await Wishlist.findById(req.params.id)
        console.log(req.params.id)
        if ( wishlist == null ) { 
            return res.status(404).json({message: 'Cannot find Subscriber'}) 
        }
    } catch (err:any) {
        return res.status(500).json({message: err.message})
    }

    res.wishlist = wishlist
    next()
}



module.exports = router;