const createToolParseMiddleware = async (req, res, next) => {
   const specificationsJSON = req.body.specifications;
  const descriptionJSON = req.body.description;

  try {
    req.body.specifications = JSON.parse(specificationsJSON);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Invalid JSON format for specifications" });
  }

  try {
    req.body.description = JSON.parse(descriptionJSON);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Invalid JSON format for description" });
  }

  next();
};

module.exports = {
  createToolParseMiddleware,
};
