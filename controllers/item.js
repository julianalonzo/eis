const mongoose = require('mongoose');

const { extractIdsFromNewFiles, saveFiles } = require('./file');

const Item = require('../models/item');

exports.getItems = async (req, res, next) => {
  try {
    const folderId = req.query.folderId || null;

    let items = [];
    if (Boolean(folderId)) {
      items = await Item.find({ folder: folderId, shown: true }).populate(
        'thumbnails'
      );
    } else {
      items = await Item.find().populate('thumbnails');
    }

    res.status(200).json({ items: items });
  } catch (err) {
    console.log(err);
  }
};

exports.getItem = async (req, res, next) => {
  try {
    const itemId = req.params.itemId || null;

    if (Boolean(itemId)) {
      const item = await Item.findOne({ _id: itemId })
        .populate('thumbnails')
        .populate('attachments')
        .exec();

      if (Boolean(item)) {
        res.status(200).json({ item: item });
      } else {
        res.status(404).json({ item: null, message: 'Item not found' });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.createItems = async (req, res, next) => {
  // @TODO: Add validation

  try {
    const name = req.body.name || '';
    const category = req.body.category || '';
    const condition = req.body.condition || '';
    const properties = req.body.properties
      ? JSON.parse(req.body.properties)
      : [];
    const templateThumbnails = req.body.templateThumbnails
      ? JSON.parse(req.body.templateThumbnails)
      : [];
    const fileThumbnails = req.files.fileThumbnails || [];
    const templateAttachments = req.body.templateAttachments
      ? JSON.parse(req.body.templateAttachments)
      : [];
    const fileAttachments = req.files.fileAttachments || [];
    const folder = req.body.folder || '';

    const itemData = await this.generateItemData(
      name,
      category,
      condition,
      properties,
      templateThumbnails,
      fileThumbnails,
      templateAttachments,
      fileAttachments
    );

    const item = new Item({
      ...itemData,
      notes: [],
      shown: true,
      folder: folder
    });

    const savedItem = await item.save();

    res.status(201).json({ item: savedItem });
  } catch (err) {
    console.log(err);
  }
};

exports.generateItemData = async (
  name,
  category,
  condition,
  properties,
  templateThumbnails,
  fileThumbnails,
  templateAttachments,
  fileAttachments
) => {
  try {
    /**
     * Ensure that an array is passed to the Item's properties field since it is
     * possible that req.body.properties is not an array but a single value
     */
    const processedProperties = properties || [];

    const processedTemplateThumbnails = templateThumbnails || [];
    const processedNewThumbnails = fileThumbnails
      ? await extractIdsFromNewFiles('thumbnail', fileThumbnails)
      : [];
    const processedThumbnails = processedTemplateThumbnails.concat(
      processedNewThumbnails
    );

    const processedTemplateAttachments = templateAttachments || [];
    const processedNewAttachments = fileAttachments
      ? await extractIdsFromNewFiles('attachment', fileAttachments)
      : [];
    const processedAttachments = processedTemplateAttachments.concat(
      processedNewAttachments
    );

    const item = {
      name: name || '',
      category: category || '',
      condition: condition || '',
      thumbnails: processedThumbnails,
      properties: processedProperties,
      attachments: processedAttachments
    };

    return item;
  } catch (err) {
    console.log(err);
  }
};

exports.updateItemDetails = async (req, res, next) => {
  // @TODO: Add validation

  try {
    const itemId = req.body.itemId;
    const name = req.body.name;
    const category = req.body.category;
    const condition = req.body.condition;
    const thumbnails = req.body.thumbnails
      ? JSON.parse(req.body.thumbnails)
      : undefined;

    const newThumbnailsIds = req.files.fileThumbnails
      ? await extractIdsFromNewFiles('thumbnail', req.files.fileThumbnails)
      : undefined;

    await Item.updateOne(
      { _id: itemId },
      {
        $set: {
          name,
          category,
          condition,
          thumbnails
        }
      },
      { omitUndefined: true }
    );

    await Item.updateOne(
      { _id: itemId },
      {
        $addToSet: {
          thumbnails: newThumbnailsIds
        }
      },
      { omitUndefined: true }
    );

    const modifiedItemDetails = await Item.findById(itemId).populate(
      'thumbnails'
    );

    res.status(200).json({
      updatedItemDetails: {
        _id: modifiedItemDetails.id,
        name: modifiedItemDetails.name,
        category: modifiedItemDetails.category,
        condition: modifiedItemDetails.condition,
        thumbnails: modifiedItemDetails.thumbnails
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addProperty = async (req, res, next) => {
  try {
    const itemId = req.body.itemId;
    const property = req.body.property;

    // @TODO: Add validators

    const newProperty = {
      _id: mongoose.Types.ObjectId(),
      name: property.name,
      value: property.value || ''
    };

    await Item.updateOne(
      { _id: itemId },
      {
        $push: {
          properties: newProperty
        }
      }
    );

    res.status(200).json({
      property: newProperty
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateProperty = async (req, res, next) => {
  try {
    const itemId = req.body.itemId;
    const property = req.body.property;

    await Item.updateOne(
      { _id: itemId, 'properties._id': property._id },
      {
        $set: {
          'properties.$.name': property.name,
          'properties.$.value': property.value
        }
      }
    );

    res.status(200).json({
      property: property
    });
  } catch (err) {
    console.log(err);
  }
};

exports.removeProperty = async (req, res, next) => {
  try {
    const itemId = req.body.itemId;
    const propertyId = req.body.propertyId;

    await Item.updateOne(
      { _id: itemId },
      { $pull: { properties: { _id: propertyId } } }
    );

    res.status(200).json({
      propertyId: propertyId
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addAttachments = async (req, res, next) => {
  try {
    const itemId = req.body.itemId;
    const fileAttachments = await saveFiles(
      'attachment',
      req.files.fileAttachments || []
    );
    const attachmentsIds = fileAttachments.map(attachment => attachment._id);

    await Item.updateOne(
      { _id: itemId },
      {
        $addToSet: {
          attachments: attachmentsIds
        }
      }
    );

    res.status(200).json({
      attachments: fileAttachments
    });
  } catch (err) {
    console.log(err);
  }
};

exports.removeAttachment = async (req, res, next) => {
  try {
    const itemId = req.body.itemId;
    const attachmentId = req.body.attachmentId;

    await Item.updateOne(
      { _id: itemId },
      { $pull: { attachments: attachmentId } }
    );

    res.status(200).json({
      attachmentId: attachmentId
    });
  } catch (err) {
    console.log(err);
  }
};

exports.removeItem = async (req, res, next) => {
  const itemId = req.body.itemId;
  try {
    if (itemId) {
      await Item.updateOne({ _id: itemId }, { $set: { shown: false } });

      res.status(200).json({ removedItemId: itemId });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.removeItemsByFolderId = async folderId => {
  const folderItems = await Item.find({ folder: folderId, shown: true });

  await Item.updateMany(
    { folder: folderId, shown: true },
    { $set: { shown: false } }
  );

  return folderItems.map(item => item.id);
};

exports.addNote = async (req, res, next) => {
  // @TODO Add validation

  try {
    const itemId = req.body.itemId;
    const content = req.body.content;

    const newNote = {
      _id: mongoose.Types.ObjectId(),
      content: content,
      datePosted: new Date().toISOString()
    };

    await Item.updateOne(
      { _id: itemId },
      {
        $addToSet: {
          notes: newNote
        }
      }
    );

    res.status(200).json({
      note: { ...newNote }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.removeNote = async (req, res, next) => {
  // @TODO Add validation

  try {
    const itemId = req.body.itemId;
    const noteId = req.body.noteId;

    await Item.updateOne(
      { _id: itemId },
      { $pull: { notes: { _id: noteId } } }
    );

    res.status(200).json({
      noteId: noteId
    });
  } catch (err) {
    console.log(err);
  }
};
