import { Contact } from '../modules/contact/contact.model.js';

class ContactService {
  /**
   * Create a new contact inquiry in the database
   * @param {Object} data - The validated contact data
   * @returns {Promise<Object>} - The saved contact document
   */
  async createContactInquiry(data) {
    try {
      const contact = new Contact(data);
      const savedContact = await contact.save();
      return savedContact;
    } catch (error) {
      throw error;
    }
  }
}

export const contactService = new ContactService();
