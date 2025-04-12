import mongoose from "mongoose";

/**
 * MongoDB Schema for Subscription Management
 * Defines the structure and validation rules for subscription documents
 */

const subscriptionSchema = new mongoose.Schema(
  {
    // Basic subscription details
    name: {
      type: String,
      required: [true, "Subscription Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },

    // Price information with validation
    price: {
      type: Number,
      required: [true, "Subscription Price is required"],
      min: [0, "Subscription Price must be greater than or equal to 0"],
      max: [10000, "Subscription Price must be less than or equal to 1000000"],
    },

    // Supported currencies with USD as default
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR", "AUD"],
      default: "USD",
    },

    // Billing frequency options
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },

    // Subscription category for organization
    category: {
      type: String,
      enum: [
        "entertainment",
        "food",
        "health",
        "fitness",
        "education",
        "travel",
        "other",
      ],
      required: true,
    },

    // Payment method information
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },

    // Current status of the subscription
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    // Subscription timeline validators
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          value <= new Date();
        },
        message: "Start date must be in the past",
      },
    },

    // Next renewal date with validation
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },

    // Reference to the user who owns this subscription
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
      index: true, // Indexed for faster queries
    },
  },
  { timestamps: true }
);

/**
 * Middleware: Pre-save hook
 * Automatically calculates renewal date if not provided
 * Updates status to expired if renewal date has passed
 */

//Auto Calculate renewal date if missing

subscriptionSchema.pre("save", function (next) {
  // Calculate renewal date based on frequency if not set
  if (!this.renewalDate) {
    const renwalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.startDate.getDate() + renwalPeriods[this.frequency]
    );
  }

  // Auto Update the status if renewal date is passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
