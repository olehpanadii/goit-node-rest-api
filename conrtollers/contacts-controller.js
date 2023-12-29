import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

import Contact from "../models/Contact.js";

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(
      404,
      `The contact with id=${id} was not found in your contact list`
    );
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(
      404,
      `The contact with id=${id} was not found in your contact list`
    );
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
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
