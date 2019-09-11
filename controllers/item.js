const { parseElementsToJSON } = require('../util/helperFunctions');
const {
  extractIdsFromExistingFiles,
  extractIdsFromNewFiles
} = require('./file');

const Item = require('../models/item');

exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find().populate('thumbnails');

    res.status(200).json({ items: items });
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
    const fileThumbnails = req.files.fileAttachments || [];
    const templateAttachments = req.body.templateAttachments || [];
    const fileAttachments = req.files.fileAttachments || [];

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
      ...itemData
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
