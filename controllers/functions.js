const db = require("../database/connect");
const { z } = require("zod");

async function getEvents(req, res, next) {
  try {
    const events = await db.any(
      "SELECT event_name, event_id, status, CAST(event_date as char(10)) FROM events ORDER BY event_date"
    );
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

async function flipStatus(req, res, next) {
  try {
    const id = req.params.eventId;
    let newStatus = "";

    const idValidator = z.string().uuid();
    const validatedId = idValidator.parse(id);

    const { status } = await db.one(
      "SELECT status FROM events WHERE event_id = $1",
      [validatedId]
    );

    if (status === "notDone") {
      newStatus = "done";
    } else {
      newStatus = "notDone";
    }

    await db.none("UPDATE events SET status = $1 WHERE event_id = $2", [
      newStatus,
      validatedId,
    ]);

    res.status(201).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getEvents,
  postEvent,
  deleteEvent,
  flipStatus,
};
