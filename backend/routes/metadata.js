import express from "express";
import legendary from "../data/legendary.js";

const router = express.Router();

function getImageByNFT(id) {
  let current = 1;

  for (const item of legendary) {
    const end = current + item.copies - 1;

    if (id >= current && id <= end) {
      return item.file;
    }

    current = end + 1;
  }

  return null;
}

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id < 1) {
    return res.status(400).json({
      error: "Invalid NFT ID",
    });
  }

  const file = getImageByNFT(id);

  if (!file) {
    return res.status(404).json({
      error: "NFT not found",
    });
  }

  const reveal = process.env.REVEAL === "true";

  const image = reveal
    ? `ipfs://${process.env.IMAGE_CID}/${file}`
    : `ipfs://${process.env.HIDDEN_CID}`;

  res.json({
    name: `Alamdar #${id}`,
    description: "Alamdar NFT Collection on TON",
    image,

    attributes: [
      {
        trait_type: "Collection",
        value: "Legendary",
      },
      {
        trait_type: "File",
        value: file,
      },
      {
        trait_type: "Reveal",
        value: reveal ? "Revealed" : "Hidden",
      },
    ],
  });
});

export default router;