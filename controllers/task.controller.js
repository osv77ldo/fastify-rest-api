const _ = require('lodash');
const async = require('async');
const Cloudinary = require('../integrations/cloudinary');
const Sendgrid = require('../integrations/sendgrid');
const { TaskModel } = require('../models/index.js');
const {ENABLE_FEATURE_SEND_EMAIL} = require('../config/index.js')

module.exports = class TaskController{
  
  static list(req, reply) {
    const query = req.params;
    const findParams = {enable:true};
    let queryParams = {};
    
    if (query.sort) queryParams.sort = query.sort;

    if (query.filter) {
      findParams[_.replace(q.filter, '-', '')] = _.indexOf(q.filter, '-') > -1 ? false : true;
    }

    TaskModel.find(findParams, null, queryParams).exec( (err, docs) => {
      reply.send(docs)
    });
  }
  
  static create(req, reply) {
    TaskModel.create(req.body).then(doc => {
      reply.send(doc);
    });
  }

  static read(req, reply) {
    TaskModel.findById(req.params.id).lean().exec().then(doc => {
      reply.send(doc);
    });
  }

  static update(req, reply) {
    let oldTask = null;
    let newTask = null;

    async.waterfall([callback => {
      TaskModel.findById(req.params.id).lean().exec((err, doc) => {
        oldTask = doc;
        callback(null);
      });
    }, callback => {
      TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true, safe: true }).lean().exec((err, doc) => {
        newTask = doc;
        callback(null);
      });
    }, callback => {
      if (ENABLE_FEATURE_SEND_EMAIL == true){
        Sendgrid.send({
          oldTask,
          newTask,
          action: 'Updated Task'
        }).then(() => {
          callback(null);
        });
      }
    }], err => {
      reply.send(newTask);
    });
  }

  static updateTitle(req, reply) {
    TaskModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title
    }).lean().exec().then(doc => {
      reply.send(doc);
    });
  }

  static updateCompleted(req, reply) {
    TaskModel.findByIdAndUpdate(req.params.id, {
      completed: req.body.completed
    }).lean().exec().then(doc => {
      reply.send(doc);
    });
  }

  static updateImages(req, reply) {
    let images = null;
    let oldTask = null;
    async.parallel([callback => {
      Cloudinary.uploadImages(req.raw.files, (err, files) => {
        images = files;
        callback(null);
      });
    }, callback => {
      TaskModel.findById(req.params.id).select('images').lean().exec((err, doc) => {
        oldTask = doc;
        callback(null);
      });
    }], err => {
      TaskModel.findByIdAndUpdate(req.params.id, {
        images: _.concat(oldTask.images || [], _.map(images, img => img.url))
      }).lean().exec().then(doc => {
        reply.send(doc);
      });
    });
  }

  static delete(req, reply) {
    TaskModel.findByIdAndUpdate(req.params.id, {
      enable: false
    }).lean().exec().then(doc => {
      reply.send(doc);
    });
  }
};