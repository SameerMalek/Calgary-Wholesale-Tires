import express from 'express';
import { getCategories } from '../controller/category.controller.js';

const router = express.Router();

//Get all the categories:

router.get('/category', getCategories);

export default router;
