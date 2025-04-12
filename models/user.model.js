import mongoose from "mongoose";

/**
 * MongoDB Schema for User Management
 * Defines the structure and validation rules for user documents
 */
const userSchema = mongoose.Schema(
  {
    // Basic user information
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true, // Removes whitespace from both ends
      minLength: 2, // Minimum 2 characters required
      maxLength: 50, // Maximum 50 characters allowed
    },

    // User email with validation
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true, // Ensures email uniqueness in the database
      trim: true, // Removes whitespace
      lowercase: true, // Converts email to lowercase
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"], // Email format validation
    },

    // User password with security constraints
    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: 6, // Minimum password length for security
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

export default User;

// Example user document format:
// {name: 'John Doe', email: 'john@jd.info', password: 'password'}
