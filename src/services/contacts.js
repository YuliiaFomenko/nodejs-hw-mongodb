import createHttpError from "http-errors";
import { Contact } from "../db/models/contact.js";

export const getAllContacts = async() => {
  const contacts = await Contact.find();
  return contacts;
}; 

export const getContactById = async(contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async(payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, payload, {
    ...options,
    new: true,
    includeResultMetadata: true,
  });

  if (!result.value) {
    throw createHttpError(404, 'Contact not found');
  }

  return {
    contact: result.value,
    isNew: !result.lastErrorObject.updatedExisting,
  };
};

export const deleteContactById = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  return deletedContact;
};