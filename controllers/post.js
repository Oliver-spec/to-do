const db = require("../database/connect");
const { fetchEvents } = require("./functions");
const { z } = require("zod");

async function postEvent(req, res, next) {
  try {
    const event = req.body;

    const eventValidator = z
      .object({
        eventName: z.string().min(1).max(1000),
        eventDate: z.string().datetime(),
      })
      .strict();
    const { eventName, eventDate } = eventValidator.parse(event);

    await db.none(
      `
      INSERT INTO 
        events (event_name, event_date, status) 
      VALUES 
        ($1, $2, $3)
      `,
      [eventName, eventDate, "notDone"]
    );

    const resData = await fetchEvents(1);

    res.status(201).send(resData);
  } catch (err) {
    next(err);
  }
}

module.exports = postEvent;
