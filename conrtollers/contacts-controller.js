import { HttpError } from "../helpers/index.js";

import fs from "fs/promises";
import path from "path";

import { ctrlWrapper } from "../decorators/index.js";

import Contact from "../models/Contact.js";

const avatarPath = path.resolve("public", "avatars");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };

  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

const getById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id, owner });
  if (!result) {
    throw HttpError(
      404,
      `The contact with id=${id} was not found in your contact list`
    );
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);
  const result = await Contact.create({ ...req.body, avatarURL, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id, owner }, req.body);
  if (!result) {
    throw HttpError(
      404,
      `The contact with id=${id} was not found in your contact list`
    );
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id, owner });
  if (!result) {
    throw HttpError(
      404,
      `The contact with id=${id} was not found in your contact list`
    );
  }
  res.json({
    message: "Contact successfully deleted",
  });
};
export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
