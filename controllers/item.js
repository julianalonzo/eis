const { extractIdsFromNewFiles } = require('./file');
const { getFolderHierarchy } = require('./folder');

const Item = require('../models/item');

exports.getItems = async (req, res, next) => {
  try {
    const folderId = req.query.folderId || null;

    const searchQuery = req.query.search || null;

    let items = [];
    if (Boolean(folderId)) {
      items = await Item.find({ folder: folderId, shown: true }).populate(
        'thumbnails'
      );
    } else if (Boolean(searchQuery)) {
      const searchedItems = await Item.find(
        {
          $text: { $search: searchQuery },
          shown: true
        },
        {
          score: { $meta: 'textScore' }
        }
      )
        .sort({ score: { $meta: 'textScore' } })
        .populate('thumbnails');

      let itemsWithFolderHierarchy = [];
      for (const item of searchedItems) {
        const folderHierarchy = await getFolderHierarchy(item.folder);

        itemsWithFolderHierarchy = itemsWithFolderHierarchy.concat({
          ...item._doc,
          folderHierarchy: folderHierarchy
        });
      }

      items = itemsWithFolderHierarchy;
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
        res.status(200).json({
          item: item
        });
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

exports.updateItem = async (req, res, next) => {
  // @TODO: Add validation

  try {
    const itemId = req.params.itemId;

    const name = req.body.name;
    const category = req.body.category || '';
    const condition = req.body.condition || '';
    const thumbnails = req.body.thumbnails
      ? JSON.parse(req.body.thumbnails)
      : undefined;
    const attachments = req.body.attachments
      ? JSON.parse(req.body.attachments)
      : undefined;
    const properties = req.body.properties
      ? JSON.parse(req.body.properties)
      : undefined;
    const notes = req.body.notes ? JSON.parse(req.body.notes) : undefined;

    const newThumbnailsIds = req.files.fileThumbnails
      ? await extractIdsFromNewFiles('thumbnail', req.files.fileThumbnails)
      : undefined;

    const newAttachmentsIds = req.files.fileAttachments
      ? await extractIdsFromNewFiles('attachment', req.files.fileAttachments)
      : undefined;

    await Item.updateOne(
      { _id: itemId },
      {
        $set: {
          name,
          category,
          condition,
          thumbnails,
          attachments,
          properties,
          notes
        }
      },
      { omitUndefined: true }
    );

    await Item.updateOne(
      { _id: itemId },
      {
        $addToSet: {
          thumbnails: newThumbnailsIds,
          attachments: newAttachmentsIds
        }
      },
      { omitUndefined: true }
    );

    const item = await Item.findOne({ _id: itemId })
      .populate('thumbnails')
      .populate('attachments')
      .exec();

    res.status(200).json({
      item: item
    });
  } catch (err) {
    console.log(err);
  }
};

exports.removeItem = async (req, res, next) => {
  const itemId = req.params.itemId;

  try {
    if (itemId) {
      await Item.updateOne({ _id: itemId }, { $set: { shown: false } });

      res.status(200).json({ itemId: itemId });
    }
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

exports.removeItemsByFolderId = async folderId => {
  const folderItems = await Item.find({ folder: folderId, shown: true });

  await Item.updateMany(
    { folder: folderId, shown: true },
    { $set: { shown: false } }
  );

  return folderItems.map(item => item.id);
};
