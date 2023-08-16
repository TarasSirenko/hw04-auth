// const fs = require("fs");
const {
  uploadToolPicture,
  createTool,
  addToolToTheStore,
  getAllTools,
  getToolByStore,
  getToolByType,
  getToolById,
  deleteFileFromStorage,
  deleteTool,
  removeToolFromTheStore,
  updateToolInformation,
  getPictureUrlbyId,
  updateStoreTool,
  updatePictureTool,
} = require("../services/toolsServices");

const createToolController = async (req, res) => {
  const {
    name,
    type,
    serialNumber,
    specifications,
    description,
    price,
    tags,
    storeId,
  } = req.body;
  // const toolPictureUrl = await uploadToolPicture(req.file);
  // if (!toolPictureUrl) return res.status(404).json("Failed to load image");
  const newTool = await createTool(
    name,
    type,
    serialNumber,
    specifications,
    description,
    price,
    tags,
    // toolPictureUrl,
    storeId
  );
  // fs.unlink(req.file.path, (err) => {
  //   if (err) {
  //     console.error("Error deleting file:", err);
  //   } else {
  //     console.log("File deleted successfully");
  //   }
  // });
  const updatedStore = await addToolToTheStore(storeId, newTool._id);
  if (!updatedStore) return res.status(404).json("No store with this id");

  return res.status(200).json(newTool);
};

const getAllToolsController = async (req, res) => {
  const page = req.query.page || 1;
  const allTools = await getAllTools(page);
  if (allTools.length === 0) return res.status(404).json("Tool not found");
  return res.status(200).json(allTools);
};

const getToolByStoreController = async (req, res) => {
  const page = req.query.page || 1;
  const { storeId } = req.body;
  const tools = await getToolByStore(storeId, page);
  if (tools.length === 0) return res.status(404).json("Tool not found");
  return res.status(200).json(tools);
};
const getToolByTypeController = async (req, res) => {
  const page = req.query.page || 1;
  const { type } = req.body;
  const tools = await getToolByType(type, page);
  if (tools.length === 0) return res.status(404).json("Tool not found");
  return res.status(200).json(tools);
};
const getToolByIdController = async (req, res) => {
  const { toolId } = req.params;
  const tool = await getToolById(toolId);
  if (tool.length === 0) return res.status(404).json("Tool not found");
  return res.status(200).json(tool);
};

const deleteToolController = async (req, res) => {
  const { toolId } = req.params;
  
  const deletedTool = await deleteTool(toolId);
  if (!deletedTool) return res.status(404).json({ message: "Tool not found" });

  const updatedStore = await removeToolFromTheStore(
    deletedTool.storeId,
    deletedTool._id
  );
  if (!updatedStore) return res.status(404).json("No store with this id");

  
   const result = await deleteFileFromStorage(deletedTool.toolPicture);
   if (result) {
     console.log("File deleted successfully");
   } else {
     console.log("Error deleting file");
   }


  return res.status(200).json("Tool removed successfully");
};

const updateInformationToolController = async (req, res) => {
  const { toolId } = req.params;
  const { name, type, serialNumber, specifications, description, price, tags } =
    req.body;

  const updatedTool = await updateToolInformation(
    toolId,
    name,
    type,
    serialNumber,
    specifications,
    description,
    price,
    tags
  );
  if (!updatedTool) return res.status(404).json({ message: "Tool not found" });
  return res.status(200).json(updatedTool);
};


const updatePictureToolController = async (req, res) => {
  const { toolId } = req.params;

  const oldPictureUrl = await getPictureUrlbyId(toolId);
  if(!oldPictureUrl)res.status(404).json("Tool not found");
  const result = await deleteFileFromStorage(oldPictureUrl);
    if (result) {
      console.log("File deleted successfully");
    } else {
      console.log("Error deleting file");
    }

 const newToolPictureUrl = await uploadToolPicture(req.file);
  if (!newToolPictureUrl) return res.status(404).json("Failed to load image");
  

  const updatedTool = await updatePictureTool(toolId, newToolPictureUrl);

    // fs.unlink(req.file.path, (err) => {
    //   if (err) {
    //     console.error("Error deleting file:", err);
    //   } else {
    //     console.log("File deleted successfully");
    //   }
    // });

  return res.status(200).json(updatedTool);
};

const updateStoreToolController = async (req, res) => {
  const { toolId } = req.params;
  const { oldStoreId, newStoreId } = req.body;

  const updatedTool = await updateStoreTool(newStoreId, toolId);
  if (!updatedTool) return res.status(404).json({ message: "Tool not found" });
  const updatedStore = await addToolToTheStore(newStoreId, toolId);
    const oldStore = await removeToolFromTheStore(oldStoreId, toolId);
    if (!oldStore) return res.status(404).json("No store with this id");
    if (!updatedStore) return res.status(404).json("No store with this id");
  return res.status(200).json(updatedTool);
};





module.exports = {
  createToolController,
  getAllToolsController,
  getToolByStoreController,
  getToolByTypeController,
  getToolByIdController,
  deleteToolController,
  updateInformationToolController,
  updatePictureToolController,
  updateStoreToolController,
};
