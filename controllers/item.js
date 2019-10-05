const { parseElementsToJSON } = require('../util/helperFunctions');
const {
  extractIdsFromExistingFiles,
  extractIdsFromNewFiles
} = require('./file');

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
      const item = await Item.findOne({ _id: itemId });

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
    const properties = req.body.properties || [];
    const templateThumbnails = req.body.templateThumbnails || [];
    const fileThumbnails = req.files.fileThumbnails || [];
    const templateAttachments = req.body.templateAttachments || [];
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
    const processedProperties = properties
      ? parseElementsToJSON(properties)
      : [];

    const processedTemplateThumbnails = templateThumbnails
      ? extractIdsFromExistingFiles('thumbnail', templateThumbnails)
      : [];
    const processedNewThumbnails = fileThumbnails
      ? await extractIdsFromNewFiles('thumbnail', fileThumbnails)
      : [];
    const processedThumbnails = processedTemplateThumbnails.concat(
      processedNewThumbnails
    );

    const processedTemplateAttachments = templateAttachments
      ? extractIdsFromExistingFiles('attachment', templateAttachments)
      : [];
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
