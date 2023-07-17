
const { Storage } = require("@google-cloud/storage");


const storage = new Storage();

const bucketName = "toolslemaev";
const filePath = "./sambor.png";
const destFileName = "sambor.png";

async function uploadFile() {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
    metadata: {
      contentType: "image/png", 
    },
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
}

uploadFile().catch(console.error);