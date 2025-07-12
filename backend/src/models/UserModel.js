import prisma from "../config/prisma.js";

class User {
  // Create a new user
  static async create(userData) {
    try {
      return await prisma.user.create({
        data: userData
      });
    } catch (error) {
      throw error;
    }
  }

  // Find user by criteria (email, id, etc.)
  static async findOne(criteria) {
    try {
      return await prisma.user.findFirst({
        where: criteria
      });
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      return await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      return await prisma.user.findUnique({
        where: { email }
      });
    } catch (error) {
      throw error;
    }
  }

  // Update user
  static async findByIdAndUpdate(id, updateData) {
    try {
      return await prisma.user.update({
        where: { id: parseInt(id) },
        data: updateData
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all users
  static async find() {
    try {
      return await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  static async findByIdAndDelete(id) {
    try {
      return await prisma.user.delete({
        where: { id: parseInt(id) }
      });
    } catch (error) {
      throw error;
    }
  }

  // Count users
  static async count() {
    try {
      return await prisma.user.count();
    } catch (error) {
      throw error;
    }
  }
}

export default User;
