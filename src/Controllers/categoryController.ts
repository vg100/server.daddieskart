import Category from '../Models/category'
import awsServices from '../Utils/awsServices';



export class categoryController {
  static async createCategory(req, res, next) {
    try {
      const category = new Category({
        ...req.body,
        });
        const newCategory = await category.save();
        res.status(201).json(newCategory);
      return
      awsServices.uploadFile(req.file.path, req.file.filename, async (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        const category = new Category({
        ...req.body,
        thumbnail:data
        });
        const newCategory = await category.save();
        res.status(201).json(newCategory);
      })

    } catch (e) {
      next(e);
    }
  }

  static async getAllCategory(req, res, next) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (e) {
      next(e);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const category = await Category.findById(req.category._id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (e) {
      next(e);
    }
  }
  static async upadteCategory(req, res, next) {
    try {
      const users = await Category.findByIdAndUpdate(req.category._id, req.body, { new: true })
      res.json(users);
  } catch (e) {
      next(e);
  }
  }

  static async deleteCategory(req, res, next) {

    try {
      const category = await Category.findById(req.category._id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      await category.remove();
      res.json({ message: 'Category deleted' });
    } catch (e) {
      next(e);
    }
  }

}