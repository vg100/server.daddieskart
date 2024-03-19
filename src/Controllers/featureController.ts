import Feature from '../Models/features'
import User from '../Models/user'



export class featureController {
  static async createFeature(req, res, next) {
    try {
      const features = new Feature(req.body);
      const newfeatures = await features.save();
      res.status(201).json(newfeatures);
    } catch (e) {
      next(e);
    }
  }

  static async getAllFeature(req, res, next) {
    try {
      const feature = await Feature.find();
      res.json(feature);
    } catch (e) {
      next(e);
    }
  }

  static async getFeatureById(req, res, next) {
    try {
      const feature = await Feature.findById(req.params.id);
      if (!feature) {
        return res.status(404).json({ message: 'Feature not found' });
      }
      res.json(feature);
    } catch (e) {
      next(e);
    }
  }
  static async upadteFeature(req, res, next) {
    try {
      const feature = await Feature.findById(req.params.id);
      if (!feature) {
        return res.status(404).json({ message: 'Feature not found' });
      }
      Object.assign(feature, req.body);
      const updatedfeature = await feature.save();
      res.json(updatedfeature);
    } catch (e) {
      next(e);
    }
  }

  static async deleteFeature(req, res, next) {
    try {
      const feature = await Feature.findById(req.params.id);
      if (!feature) {
        return res.status(404).json({ message: 'Feature not found' });
      }
      await feature.remove();
      res.json({ message: 'Feature deleted' });
    } catch (e) {
      next(e);
    }
  }
  static async enableFeature(req, res, next) {
    try {
      const { featureId, userId } = req.body;
      const feature = await Feature.findById(featureId);
      if (!feature) {
        return res.status(404).json({ message: 'Feature not found' });
      }

      const user = await User.findById(userId);
      if (!user.Permissions.includes(featureId)) {
        user.Permissions.push(featureId);
        await user.save();
        res.json({ message: 'Feature added' });
      }
      res.json({ message: 'Feature already added' });
    } catch (e) {
      next(e);
    }
  }


}