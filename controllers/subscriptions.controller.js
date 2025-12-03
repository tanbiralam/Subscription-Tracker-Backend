import { DISABLE_QSTASH, SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subcription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    let workflowRunId = null;

    if (DISABLE_QSTASH !== "true") {
      const { workflowRunId: triggeredId } = await workflowClient.trigger({
        url: `${SERVER_URL}/api/v1/workflows/send-reminders`,
        body: {
          subscriptionId: subcription._id,
        },
        headers: {
          "Content-Type": "application/json",
        },
        retries: 0,
      });
      workflowRunId = triggeredId;
    }

    res.status(201).json({
      success: true,
      data: {
        subcription,
        workflowRunId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error(
        "You are not authorized to view this user's subscriptions"
      );
      error.statusCode = 403; // Forbidden
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      data: {
        subscriptions,
      },
    });
  } catch (error) {
    next(error);
  }
};
