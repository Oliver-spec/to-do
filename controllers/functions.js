const db = require("../database/connect");
const { z } = require("zod");

async function getEvents(req, res, next) {
  try {
    const events = await db.any("SELECT * FROM events");
    res.status(200).send(events);
  } catch (err) {
    next(err);
  }
}

async function postEvent(req, res, next) {
  try {
    const event = req.body;

    const eventValidator = z
      .object({
        eventName: z.string().min(1).max(1000),
        eventDate: z.string().datetime(),
        status: z.enum(["done", "notDone"]),
      })
      .strict();
    const { eventName, eventDate, status } = eventValidator.parse(event);

    await db.none(
      "INSERT INTO events (event_name, event_date, status) VALUES ($1, $2, $3)",
      [eventName, eventDate, status]
    );

    res.status(201).end();
  } catch (err) {
    next(err);
  }
}

async function deleteEvent(req, res, next) {
  try {
    const eventId = req.params.eventId;

    const eventIdValidator = z.string().uuid();
    const validatedEventId = eventIdValidator.parse(eventId);

    await db.none("DELETE FROM events WHERE event_id = $1", [validatedEventId]);

    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getEvents,
  postEvent,
  deleteEvent,
};
