import cron from "node-cron";
import { Event } from "../models/event.model.js";
import { Notification } from "../models/notification.model.js";

cron.schedule("*/5 * * * *", async () => {
  const now = new Date();
  const inTenMinutes = new Date(now.getTime() + 10 * 60 * 1000);

  const upcomingEvents = await Event.find({
    startDate: { $lte: inTenMinutes.toISOString() },
    notified: { $ne: true } // Add `notified` flag in Event model if needed
  });

  for (const event of upcomingEvents) {
    for (const attendee of event.attendees) {
      await Notification.create({
        userId: attendee,
        eventId: event._id,
        message: `Reminder: "${event.title}" is starting soon!`,
        type: "reminder"
      });
    }
    event.notified = true;
    await event.save();
  }

  console.log(`[${new Date().toISOString()}] Event reminders dispatched.`);
});
